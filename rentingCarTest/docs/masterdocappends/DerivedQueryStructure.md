# **Derived Query Structure**

The complete structure for creating derived queries is:

**Subject + Predicates + Modifiers + Ordering**

### **1. Subject** (Required)

- **Query action**: `find`, `read`, `get`, `query`, `stream`, `count`, `exists`, `delete`
- Examples: `findBy`, `countBy`, `existsBy`, `deleteBy`

### **2. Predicates** (Required after `By`)

- **Property expressions**: Entity field names
- **Logical operators**: `And`, `Or`
- **Condition keywords**: `LessThan`, `GreaterThan`, `Between`, `Like`, `IsNull`, `True`, `False`

### **3. Modifiers** (Optional)

- **Distinctness**: `Distinct`
- **Limiting results**: `Top`, `First` + number
- Examples: `findDistinct`, `findTop10`, `findFirst5`

### **4. Ordering** (Optional)

- **Sorting**: `OrderBy` + property + direction (`Asc`/`Desc`)
- Example: `OrderByLastNameAsc`, `OrderByTotalAmountDesc`

## **Complete Pattern**

```
[Subject][Distinct][Top/First][By][Predicates][OrderBy][Property][Asc/Desc]
```

## **Examples from Our BookingRepository**

```java
// Subject + Predicates
findByIsActiveTrue()

// Subject + Predicates (multiple)
findByCarAndIsActiveTrue(Car car)

// Subject + Predicates + Ordering
findTop10ByOrderByTotalAmountDesc()

// Subject + Predicates + Complex conditions
findByBookingDateBetween(int start, int end)
```

## **More Complex Examples**

```java
// All components together
findDistinctTop5ByCarAndIsActiveTrueOrderByTotalAmountDesc(Car car)
//  ^        ^    ^                              ^
//Subject  Mod  Predicates                   Ordering

countByClientAndBookingDateGreaterThan(Client client, int date)
existsByCarAndIsActiveTrueAndBookingDateBetween(Car car, int start, int end)
```
