# JUnit Mock Testing Guide

## Overview

> Mock testing allows you <mark>to test your service layer logic without depending on external systems</mark> like databases, web services, or file systems.
> 
> This guide demonstrates how to create effective mock tests using JUnit 5 and Mockito in Spring Boot.

## What is Mock Testing?

Mock testing involves creating **fake implementations** of dependencies that return predefined responses. This allows you to:

- **Isolate the unit under test** - Focus on testing your service logic, not database operations
- **Control external dependencies** - Define exactly what your mocks should return
- **Speed up tests** - No I/O operations means faster execution
- **Test edge cases** - Simulate error conditions that are hard to reproduce with real dependencies

## Key Annotations

### `@SpringBootTest`

```java
@SpringBootTest
public class GenerateBookingServiceTest {
```

- Loads the complete Spring application context
- Enables dependency injection for testing
- Use when you need Spring features like `@Autowired`

### `@MockBean`

```java
@MockBean
private BookingRepository bookingRepository;

@MockBean
private CarRepository carRepository;
```

- Creates mock objects and adds them to the Spring context
- Replaces any existing beans of the same type
- Perfect for mocking Spring Data repositories

### `@Autowired`

```java
@Autowired
private GenerateBookingService generateBookingService;
```

- Injects the real service implementation
- The service will receive the mocked dependencies automatically

## Mock Testing Example Breakdown

### 1. Test Setup

```java
@Test
public void testGenerateBooking() {
    // Setup test data
    Client client = new Client();
    client.setId("client123");
    client.setName("John");
    client.setLastName("Doe");

    Car car = new Car();
    car.setId("car456");
    car.setBrand("Toyota");
    car.setModel("Corolla");
    car.setPlate("ABC123");
    car.setPrice(50.0);
    car.setAvailableDates(new HashMap<>());

    Booking booking = new Booking();
    booking.setId("booking789");
```

**Purpose**: Create test objects with known, predictable data that will be used throughout the test.

### 2. Mock Behavior Definition

```java
    // Mock repository behavior
    when(bookingRepository.save(any(Booking.class))).thenReturn(booking);
    when(carRepository.save(any(Car.class))).thenReturn(car);
```

**Key Concepts**:

- `when()` - Defines what method call to intercept
- `any(Booking.class)` - Matches any Booking object passed to the method
- `.thenReturn(booking)` - Returns the predefined booking object
- **No database interaction** - The mock simply returns what you tell it to

### 3. Service Method Execution

```java
    // Call the service
    String result = generateBookingService.generateBooking(client, car, 1767225600, 3);
```

**What happens**:

1. Service method executes normally
2. When it calls `bookingRepository.save()`, the mock intercepts and returns the predefined booking
3. When it calls `carRepository.save()`, the mock intercepts and returns the predefined car
4. Service continues with its logic using the mocked return values

### 4. Assertions

```java
    // Verify the result
    assertTrue(result.contains("Booking successfully created"));
    assertTrue(result.contains("Booking ID: booking789"));
    assertTrue(result.contains("Client: John Doe"));
    assertTrue(result.contains("Car: Toyota Corolla (ABC123)"));
    assertTrue(result.contains("Total Amount: €150.00"));
```

**Purpose**: Verify that the service method produces the expected output based on the test data and mock responses.

## Mock vs Real Database Testing

| Aspect              | Mock Testing             | Real Database Testing        |
| ------------------- | ------------------------ | ---------------------------- |
| **Speed**           | Very fast (milliseconds) | Slower (seconds)             |
| **Dependencies**    | None (isolated)          | Requires database setup      |
| **Data Management** | No cleanup needed        | Requires test data cleanup   |
| **Focus**           | Business logic           | Data persistence & integrity |
| **Reliability**     | Consistent results       | May vary based on DB state   |

## Best Practices

### 1. Use Descriptive Test Names

```java
@Test
public void testGenerateBooking_WithValidData_ReturnsSuccessMessage() {
    // Test implementation
}
```

### 2. Follow AAA Pattern

```java
@Test
public void testMethod() {
    // Arrange - Setup test data and mocks
    Client client = new Client();
    when(repository.save(any())).thenReturn(savedObject);

    // Act - Execute the method under test
    String result = service.generateBooking(client, car, date, days);

    // Assert - Verify the results
    assertTrue(result.contains("success"));
}
```

### 3. Mock Only What You Need

```java
// Good - Only mock the methods your test actually calls
when(bookingRepository.save(any(Booking.class))).thenReturn(booking);

// Avoid - Don't mock methods that aren't used in the test
when(bookingRepository.findById(any())).thenReturn(Optional.of(booking));
```

### 4. Use Specific Matchers When Needed

```java
// Generic matcher
when(repository.save(any(Booking.class))).thenReturn(booking);

// Specific matcher for more precise control
when(repository.save(argThat(b -> b.getClientId().equals("client123"))))
    .thenReturn(booking);
```

## Common Mock Scenarios

### Mocking Repository Methods

```java
// Save operations
when(repository.save(any(Entity.class))).thenReturn(savedEntity);

// Find operations
when(repository.findById("123")).thenReturn(Optional.of(entity));
when(repository.findAll()).thenReturn(Arrays.asList(entity1, entity2));

// Delete operations (void methods)
doNothing().when(repository).deleteById("123");
```

### Mocking Exceptions

```java
// Simulate database errors
when(repository.save(any(Booking.class)))
    .thenThrow(new DataAccessException("Database connection failed"));
```

### Verifying Mock Interactions

```java
// Verify a method was called
verify(bookingRepository).save(any(Booking.class));

// Verify method was called with specific arguments
verify(bookingRepository).save(argThat(b -> b.getId().equals("booking789")));

// Verify method was never called
verify(bookingRepository, never()).deleteById(any());
```

## When to Use Mock Testing

### ✅ Use Mock Testing For:

- **Service layer logic** - Business rules and workflows
- **Unit tests** - Testing individual components in isolation
- **Fast feedback loops** - During development and CI/CD
- **Edge case testing** - Simulating error conditions

### ❌ Don't Use Mock Testing For:

- **Integration testing** - Testing how components work together
- **Database query validation** - Ensuring SQL queries work correctly
- **Performance testing** - Real database performance characteristics
- **Data integrity testing** - Constraint validation and transactions

## Conclusion

Mock testing is a powerful technique for creating fast, reliable, and focused unit tests. By using `@MockBean` and Mockito's `when().thenReturn()` pattern, you can isolate your service logic and test it thoroughly without the complexity and overhead of real database operations.

Remember: Mock tests validate your business logic, while integration tests validate your system interactions. Use both approaches for comprehensive test coverage.
