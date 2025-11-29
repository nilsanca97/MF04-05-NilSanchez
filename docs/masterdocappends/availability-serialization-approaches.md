# Car Availability Serialization Approaches

## Problem Statement

The `Car` entity contains a `Map<Integer, Boolean> availableDates` field that stores availability data for an entire year (365 days). When this field is serialized in REST API responses (e.g., `/api/cars`), it generates **massive JSON output of approximately 350,000 lines**, causing:

- **Performance issues**: Slow API responses due to large payload size
- **Network overhead**: Excessive bandwidth consumption
- **Client-side problems**: Difficult to parse and process large JSON responses
- **Poor user experience**: Unreadable and overwhelming data for API consumers

## Current Implementation

```java
@ElementCollection(fetch = FetchType.EAGER)
@CollectionTable(name = "car_available_dates", joinColumns = @JoinColumn(name = "car_id"))
@MapKeyColumn(name = "date_key")
@Column(name = "is_available")
private Map<Integer, Boolean> availableDates = new HashMap<>();
```

**Raw JSON Output Example:**

```json
{
  "id": "1234",
  "brand": "Toyota",
  "model": "Camry",
  "availableDates": {
    "1767225600": true,
    "1767312000": true,
    "1767398400": false,
    "1767484800": false,
    // ... 361 more entries
  }
}
```

## Proposed Solutions

### Approach 1: @JsonIgnore on availableDates Field ⭐ **RECOMMENDED**

**Implementation:**

```java
@JsonIgnore
@ElementCollection(fetch = FetchType.EAGER)
@CollectionTable(name = "car_available_dates", joinColumns = @JoinColumn(name = "car_id"))
@MapKeyColumn(name = "date_key")
@Column(name = "is_available")
private Map<Integer, Boolean> availableDates = new HashMap<>();

@JsonProperty("availabilityRanges")
public String getAvailabilityRanges() {
    return formatAvailabilityRanges();
}
```

**Pros:**

- ✅ Simple and clean implementation
- ✅ Completely hides raw data from JSON serialization
- ✅ Uses existing `formatAvailabilityRanges()` method
- ✅ Provides human-readable availability summary
- ✅ Dramatically reduces JSON payload size
- ✅ No breaking changes to existing database schema

**Cons:**

- ❌ Raw availability data not accessible via REST API
- ❌ Clients cannot perform custom date filtering
- ❌ Less flexibility for advanced use cases

**JSON Output:**

```json
{
  "id": "1234",
  "brand": "Toyota",
  "model": "Camry",
  "availabilityRanges": "\nRange#1: 01/01/2026 - 02/01/2026 Available\nRange#2: 03/01/2026 - 05/01/2026 Booked\n"
}
```

### Approach 2: Custom JsonSerializer

**Implementation:**

```java
@JsonSerialize(using = AvailabilityDateSerializer.class)
private Map<Integer, Boolean> availableDates = new HashMap<>();

public class AvailabilityDateSerializer extends JsonSerializer<Map<Integer, Boolean>> {
    @Override
    public void serialize(Map<Integer, Boolean> value, JsonGenerator gen, SerializerProvider serializers) 
            throws IOException {
        // Custom logic to serialize as ranges instead of raw map
        gen.writeString(formatAvailabilityRanges(value));
    }
}
```

**Pros:**

- ✅ Maintains field name consistency
- ✅ Reusable serializer for other entities
- ✅ More control over serialization logic

**Cons:**

- ❌ More complex implementation
- ❌ Requires additional serializer class
- ❌ Still doesn't provide raw data access

### Approach 3: DTO (Data Transfer Object) Pattern

**Implementation:**

```java
public class CarDTO {
    private String id;
    private String brand;
    private String model;
    // ... other fields
    private String availabilityRanges;

    public static CarDTO fromEntity(Car car) {
        CarDTO dto = new CarDTO();
        dto.setId(car.getId());
        dto.setBrand(car.getBrand());
        // ... map other fields
        dto.setAvailabilityRanges(car.formatAvailabilityRanges());
        return dto;
    }
}

// In Controller
@GetMapping("/cars")
public List<CarDTO> getAllCars() {
    return carService.findAll().stream()
            .map(CarDTO::fromEntity)
            .collect(Collectors.toList());
}
```

**Pros:**

- ✅ Complete control over API response structure
- ✅ Can have different DTOs for different endpoints
- ✅ Separation of concerns (entity vs API representation)
- ✅ Can include computed fields easily

**Cons:**

- ❌ Requires additional DTO classes
- ❌ More boilerplate code
- ❌ Mapping overhead between entity and DTO

### Approach 4: JsonView for Different Contexts

**Implementation:**

```java
public class Views {
    public static class Summary {}
    public static class Detailed {}
}

@JsonView(Views.Detailed.class)
private Map<Integer, Boolean> availableDates = new HashMap<>();

@JsonView(Views.Summary.class)
@JsonProperty("availabilityRanges")
public String getAvailabilityRanges() {
    return formatAvailabilityRanges();
}

// In Controller
@JsonView(Views.Summary.class)
@GetMapping("/cars")
public List<Car> getAllCars() { ... }

@JsonView(Views.Detailed.class)
@GetMapping("/cars/{id}/availability")
public Car getCarAvailability(@PathVariable String id) { ... }
```

**Pros:**

- ✅ Flexible - different views for different endpoints
- ✅ Single entity class handles multiple representations
- ✅ Can expose raw data when needed

**Cons:**

- ❌ More complex setup
- ❌ Requires view management
- ❌ Can become confusing with many views

### Approach 5: Separate Availability Endpoint

**Implementation:**

```java
// Keep @JsonIgnore on availableDates in Car entity
@JsonIgnore
private Map<Integer, Boolean> availableDates = new HashMap<>();

// Create dedicated controller methods
@GetMapping("/cars/{id}/availability")
public Map<String, Object> getCarAvailability(@PathVariable String id) {
    Car car = carService.findById(id);
    return Map.of(
        "carId", id,
        "availabilityRanges", car.formatAvailabilityRanges(),
        "rawAvailability", car.getAvailableDates() // if needed
    );
}

@GetMapping("/cars/{id}/availability/check")
public boolean isAvailable(@PathVariable String id, 
                          @RequestParam int startDate, 
                          @RequestParam int endDate) {
    // Check availability for specific date range
}
```

**Pros:**

- ✅ Clean separation of concerns
- ✅ Main `/cars` endpoint remains lightweight
- ✅ Dedicated endpoints for availability operations
- ✅ Can provide both formatted and raw data when needed

**Cons:**

- ❌ Requires multiple API calls for complete car data
- ❌ More complex client-side integration

## Performance Comparison

| Approach             | JSON Size | API Response Time | Complexity | Flexibility |
| -------------------- | --------- | ----------------- | ---------- | ----------- |
| Current (Raw Map)    | ~350KB    | Slow              | Low        | High        |
| @JsonIgnore + Ranges | ~2KB      | Fast              | Low        | Medium      |
| Custom Serializer    | ~2KB      | Fast              | Medium     | Medium      |
| DTO Pattern          | ~2KB      | Fast              | High       | High        |
| JsonView             | ~2KB      | Fast              | High       | High        |
| Separate Endpoint    | ~2KB      | Fast              | Medium     | High        |

## Recommendation

**Use Approach 1: @JsonIgnore + @JsonProperty** for the following reasons:

1. **Immediate impact**: Reduces JSON payload by 99.4% (from ~350KB to ~2KB)
2. **Minimal code changes**: Only requires two annotations
3. **Leverages existing code**: Uses the already implemented `formatAvailabilityRanges()` method
4. **Maintains readability**: Provides human-friendly availability information
5. **Performance boost**: Significantly faster API responses
6. **Backward compatibility**: Doesn't break existing database schema

## Implementation Steps

1. Add `@JsonIgnore` to `availableDates` field
2. Add `@JsonProperty("availabilityRanges")` to a getter method that calls `formatAvailabilityRanges()`
3. Test the `/api/cars` endpoint to verify reduced payload size
4. Consider adding a separate endpoint for raw availability data if needed in the future

## Future Considerations

- **Caching**: Consider caching the formatted availability ranges for frequently accessed cars
- **Pagination**: Implement pagination for the `/cars` endpoint to handle large datasets
- **Filtering**: Add query parameters to filter cars by availability status
- **Real-time updates**: Consider WebSocket or Server-Sent Events for real-time availability updates
