# rentingCar v3

`version document: v3.2`

## Goal & Summary

> Rent a car by CLI with client, car, init and ending date, price with Spring Boot
> 
> New Feature: define data-model for **availability by car and dates range.**

- Reference project: [Spring Boot: H2 DB and Thymeleaf – albertprofe wiki](https://albertprofe.dev/springboot/boot-what-create-th-h2.html)
- Microservices: https://spring.io/
- Spring Boot is open-source: [GitHub - spring-projects/spring-boot: Spring Boot helps you to create Spring-powered, production-grade applications and services with absolute minimum fuss.](https://github.com/spring-projects/spring-boot)
- Spring Boot Guides / Academy: https://spring.io/guides / https://spring.academy/courses
- Quickstart: https://spring.io/quickstart

## Version

- [rentingCarTest/docs/rentingCar-sprints.md at master · AlbertProfe/rentingCarTest · GitHub](https://github.com/AlbertProfe/rentingCarTest/blob/master/docs/masterdocappends/rentingCar-sprints.md)

## Tree

```
[Mon Oct 20 10:30:53] albert@albert-VirtualBox:~/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src (master)
$ tree
.
├── main
│   ├── java
│   │   └── dev
│   │       └── app
│   │           └── rentingCar_boot
│   │               ├── controller
│   │               │   ├── CarController.java
│   │               │   └── CarRestController.java
│   │               ├── model
│   │               │   ├── Booking.java
│   │               │   ├── CarExtras.java
│   │               │   ├── Car.java
│   │               │   ├── Client.java
│   │               │   ├── DrivingCourse.java
│   │               │   └── InssuranceCia.java
│   │               ├── RentingCarBootApplication.java
│   │               ├── repository
│   │               │   ├── BookingRepository.java
│   │               │   ├── CarExtrasRepository.java
│   │               │   ├── CarRepository.java
│   │               │   ├── ClientRepository.java
│   │               │   ├── DrivingCourseRepository.java
│   │               │   └── InssuranceCiaRepository.java
│   │               ├── service
│   │               │   └── CarService.java
│   │               └── utils
│   │                   ├── GenerateUUID.java
│   │                   ├── PopulateAllTables.java
│   │                   ├── PopulateBooking.java
│   │                   ├── PopulateCar.java
│   │                   ├── PopulateClient.java
│   │                   ├── PopulateDrivingCourse.java
│   │                   └── PopulateStatus.java
│   └── resources
│       ├── application.properties
│       ├── static
│       └── templates
│           ├── cars.html
│           ├── cars-nocss-data.html
│           ├── cars-nocss.html
│           └── cars-relation.html
└── test
    └── java
        └── dev
            └── app
                └── rentingCar_boot
                    ├── BookingTests.java
                    ├── CarTests.java
                    ├── ClientTests.java
                    ├── DrivingCourseTests.java
                    └── PopulateTests.java

19 directories, 33 files
```

## Car Booking by Date Range Feature

### Availability by car/dates range

> A system functionality that allows users to reserve vehicles for specific time periods **by checking car availability against existing bookings.**
> 
> The feature validates date conflicts, prevents double-booking, and ensures seamless rental scheduling through real-time availability queries across the booking database for optimal resource management.

Analysis of Four Approaches for Car Availability (SQL/NoSQL): 

- [rentingCarTest/docs/../4-approaches-availability.md at master · AlbertProfe/rentingCarTest · GitHub](https://github.com/AlbertProfe/rentingCarTest/blob/master/docs/masterdocappends/4-approaches-availability.md)

#### Approach 2: HashMap of availableDates for year 2026

- [rentingCarTest/docs/masterdocappends/4-approaches-availability.md at master · AlbertProfe/rentingCarTest · GitHub](https://github.com/AlbertProfe/rentingCarTest/blob/master/docs/masterdocappends/4-approaches-availability.md#approach-2-car-has-hashmap-of-availabledates-for-year-2026)

- [rentingCarTest/docs/masterdocappends/FakeAvailableDatesHashMap.md at master · AlbertProfe/rentingCarTest · GitHub](https://github.com/AlbertProfe/rentingCarTest/blob/master/docs/masterdocappends/FakeAvailableDatesHashMap.md)

### checkAvailability

```java
public boolean checkAvailability(Car car, int bookingDate, int qtyDays) {
        Map<Integer, Boolean> availableDates = car.getAvailableDates();

        // Check each day in the requested booking period
        for (int i = 0; i < qtyDays; i++) {
            int currentDate = bookingDate + (i * 86400); // Add 86400 seconds (1 day) per iteration

            // If date exists in HashMap and is false (unavailable), return false
            if (availableDates.containsKey(currentDate) && !availableDates.get(currentDate)) {
                return false; // Car is not available on this date
            }
        }

        return true; // All dates are available
    }
```

### generateBooking

Implementation details for our `Orchestrator`:

| **Step**                 | **Action**              | **Implementation Details**                                                                                                                                                                                                                                                        |
| ------------------------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **calculateTotalAmount** | Simple calculation      | [qtyDays * car.getPrice()](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/model/Car.java:111:4-113:5) - Returns total cost for rental period                                                                 |
| **Step 1**               | Defensive Programming   | Validates `client != null`, `car != null`, `qtyDays > 0`, `bookingDate > 0` (valid Unix timestamp)                                                                                                                                                                                |
| **Step 2**               | Check Availability      | Uses existing [checkAvailability()](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/service/GenerateBooking.java:10:4-24:5) method - Returns error if car not available for requested dates                   |
| **Step 3**               | Calculate Total Amount  | Calls [calculateTotalAmount(car, qtyDays)](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/service/GenerateBooking.java:4:4-8:5) - Simple math: days × daily price                                            |
| **Step 4**               | Create Booking          | Creates new [Booking()](cci:2://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/model/Booking.java:5:0-105:1) instance with auto-generated ID                                                                         |
| **Step 5**               | Set Booking Data        | Sets all booking properties with validated data - Marks booking as active (`isActive = true`)                                                                                                                                                                                     |
| **Step 6**               | Save Booking            | Uses `bookingRepository.save()` to persist booking                                                                                                                                                                                                                                |
| **Step 7**               | Update Car Availability | Calls [updateCarAvailability()](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/service/GenerateBooking.java:101:4-112:5) to mark booked dates as unavailable - Saves updated car with `carRepository.save()` |
| **Step 8**               | Return Success Message  | Uses `StringBuilder` with all relevant booking data - Includes: Booking ID, Client name, Car details, dates, amount, status                                                                                                                                                       |

**Helper Methods:**

- [updateCarAvailability()](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/service/GenerateBooking.java:101:4-112:5): Marks booked dates as `false` in car's availability map
- [formatUnixTimestamp()](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/service/GenerateBooking.java:114:4-121:5): Converts Unix timestamp to `dd/MM/yyyy` format

Example Output:

```
Booking successfully created!
Booking ID: 1234
Client: John Doe
Car: Toyota Corolla (ABC123)
Start Date: 15/03/2026
Duration: 7 days
Total Amount: €1,652.29
Status: Active
```

### GenerateBooking as an Orchestrator Pattern

> The [GenerateBooking](cci:2://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/service/GenerateBooking.java:15:0-135:1) class exemplifies the **Orchestrator pattern** by coordinating multiple business operations in a <mark>centralized, sequential workflow.</mark> It orchestrates the complete booking process through 8 distinct steps: validation, availability checking, price calculation, booking creation, persistence, car availability updates, and response formatting.

Why It's an Orchestrator

- **Centralized Control**: Single point managing the entire booking workflow
- **Sequential Coordination**: Executes steps in a specific order with clear dependencies
- **Cross-Domain Integration**: Coordinates between Client, Car, and Booking entities
- **Transaction Management**: Handles database operations across multiple repositories
- **Business Logic Encapsulation**: Contains all booking-related rules and validations

#### Pattern Alternatives Comparison

Orchestrator-pattern-analysis (with code examples):

- [rentingCarTest/docs/masterdocappends/orchestrator-pattern-analysis.md at master · AlbertProfe/rentingCarTest · GitHub](https://github.com/AlbertProfe/rentingCarTest/blob/master/docs/masterdocappends/orchestrator-pattern-analysis.md)

Orchestrator-pattern-analysis:

**Command Pattern**: Would encapsulate each booking request as an object but lacks the workflow coordination that [GenerateBooking](cci:2://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/service/GenerateBooking.java:15:0-135:1) provides.

**Saga Pattern**: Better for distributed systems with compensating transactions, but overkill for this monolithic booking process.

**Service Layer Pattern**: [GenerateBooking](cci:2://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/service/GenerateBooking.java:15:0-135:1) could be split into smaller services (ValidationService, AvailabilityService, PricingService), providing better separation of concerns but requiring additional coordination logic.

**Factory Pattern**: Would only handle booking object creation, missing the comprehensive workflow management.

> The Orchestrator pattern fits perfectly here because booking requires strict sequential execution, cross-entity coordination, and centralized business rule enforcement - exactly what this implementation provides.

#### StringBuilder Relevance in GenerateBooking

> **StringBuilder** is key in the [GenerateBooking.generateBooking()](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/service/GenerateBooking.java:10:4-22:27) method because <mark>it efficiently constructs the multi-line booking confirmation response</mark>. Unlike regular string concatenation with `+` operator, StringBuilder uses an internal buffer that dynamically resizes, avoiding the creation of multiple intermediate String objects.

Why It Matters Here

- **Performance**: The method builds 7+ lines of booking details (ID, client name, car info, dates, amount, status). String concatenation would create a new String object for each append operation, causing unnecessary memory allocation and garbage collection.

- **Memory Efficiency**: StringBuilder modifies its internal character array in-place, using approximately 50% less memory than traditional concatenation.

- **Readability**: The `.append()` chain clearly shows the sequential construction of the response message.

- **Scalability**: If booking confirmations expand to include more details (insurance, terms, etc.), StringBuilder maintains optimal performance without code changes.

## HashMap

References

- [Java HashMap](https://www.w3schools.com/java/java_hashmap.asp)
- [HashMap (Java Platform SE 8 )](https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html)
- [Java HashMap (With Examples)](https://www.programiz.com/java-programming/hashmap)
- [What is a Java Hashmap?](https://www.freecodecamp.org/news/what-is-a-java-hashmap/)   

Definition

> In Java, you use a HashMap to store items in **key/value pairs**. You can access items stored in a `HashMap` using the item's key, which is unique for each item.

### What Are the Features of a HashMap in Java?

Before working with HashMaps, it is important to understand how they work.

Here are some of the features of a `HashMap`:

- Items are stored in **key/value pairs.**
- Items do not maintain **any order when added.** The data is unordered.
- In a case where there are duplicate keys, the last one will override the other(s).
- Data types are specified using **wrapper classes instead of primitive data types.**

### How to Create a HashMap in Java

In order to create and use a HashMap, you must first import the `java.util.HashMap` package. That is:

```java
import java.util.HashMap;
```

Here's what the syntax looks like for creating a new `HashMap`:

```java
HashMap<KeyDataType, ValueDataType> HashMapName = new HashMap<>();
```

## JPA Annotations for HashMap Persistence

Add these annotations above the `availableDates` field in your [Car.java](cci:7://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/model/Car.java:0:0-0:0):

```java
@ElementCollection(fetch = FetchType.LAZY)
@CollectionTable(name = "car_available_dates", joinColumns = @JoinColumn(name = "car_id"))
@MapKeyColumn(name = "date_key")
@Column(name = "is_available")
private HashMap<Integer, Boolean> availableDates = new HashMap<>();
```

Use wiht Hibernate Map instead of HashMap:

```java
private Map<Integer, Boolean> availableDates = new HashMap<>();
```

we need this because:

1. Hibernate wraps collections with `PersistentMap` proxy objects
2. Using concrete `HashMap` type in getters/setters causes type mismatch
3. Using `Map` interface allows Hibernate to inject its proxy objects properly

### **What each annotation does:**

- **`@ElementCollection`**: Tells JPA this is a collection of basic types (not entities)
- **`@CollectionTable`**: Creates a separate table `car_available_dates` to store the HashMap
- **`@MapKeyColumn`**: Maps the HashMap keys (Integer timestamps) to column `date_key`
- **`@Column`**: Maps the HashMap values (Boolean) to column `is_available`
- **`joinColumns = @JoinColumn(name = "car_id")`**: Foreign key linking back to the Car entity

Resulting H2 Table Structure:

```sql
CREATE TABLE car_available_dates (
    car_id VARCHAR(255) NOT NULL,
    date_key INTEGER NOT NULL,
    is_available BOOLEAN,
    PRIMARY KEY (car_id, date_key),
    FOREIGN KEY (car_id) REFERENCES car(id)
);
```

## UML Data Model

#### CLASS Car

```java
ackage org.example;

public class Car {
    private String id;
    private String brand;
    private String model;
    private String plate;
    private int year;
    private double price;

    // constructor, geters, setters, methods and toString

    private int carAge ()
}
```

#### CLASS Client & MinimalClient

```java
public class Client {

    private String id;
    private String name;
    private String lastName;
    private String address;
    private String email;
    private boolean premium;
    private int age;
    private String password;

    // constructor, geters, setters, methods and toString
}


public class MinimalClient {

    private String email;
    private String password;

    public MinimalClient() {
    }

    // constructor, geters, setters, methods and toString
}
```

#### CLASS Booking

```java
public class Booking {

    private String id;
    //private Client client;
    private Car car;
    private int days;
    private double price;
    private boolean isActive;
    // private LocalDate bookingDate

    // constructor, geters, setters, methods and toString
}
```

## H2 & application.properties

> Welcome to H2, the Java SQL database. The main features of H2 are:
> 
> - Very fast, open source, JDBC API
> - Embedded and server modes; in-memory databases
> - Browser based Console application
> - Small footprint: around 2.5 MB jar file size

- Official web: https://h2database.com/html/installation.html
- Create H2 db from CLI: [Lab#SB08-3: H2 and API Rest – albertprofe wiki](https://albertprofe.dev/springboot/sblab8-3.html#h2-db)
- Step-by-step: [Spring Boot: H2 DB and Thymeleaf – albertprofe wiki](https://albertprofe.dev/springboot/boot-what-create-th-h2.html)
- DDL: [Spring Boot: H2 DB and Thymeleaf – albertprofe wiki](https://albertprofe.dev/springboot/boot-what-create-th-h2.html)

Config `applcations properties` 

```properties
spring.application.name=rentingCar-boot


#spring.datasource.url=jdbc:h2:tcp://localhost/~/MyProjects/Sandbox/rentingCarTest/dataBase/rentingCar.db
spring.datasource.url=jdbc:h2:/home/albert/MyProjects/Sandbox/rentingCarTest/dataBase/rentingCar
#spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=albert
#spring.datasource.username=sa
spring.datasource.password=1234
#spring.datasource.password=

spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.show-sql=true
#spring.jpa.hibernate.ddl-auto=create
spring.jpa.hibernate.ddl-auto=update
```

This [application.properties](cci:7://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/resources/application.properties:0:0-0:0) file configures a Spring Boot application for car rental management with H2 database integration.

Application Identity

- **`spring.application.name=rentingCar-boot`** - Sets the application name used for identification in logs, monitoring tools, and service discovery. This appears in Spring Boot banners and helps distinguish this app from others.

Database Configuration

- **H2 Database Setup** - Uses H2 as an embedded/file-based database
- **Active URL**: `jdbc:h2:/home/albert/MyProjects/Sandbox/rentingCarTest/dataBase/rentingCar` - Points to a persistent file-based H2 database stored locally
- **Commented alternatives**:
  - TCP server mode: `jdbc:h2:tcp://localhost/...` (for remote access)
  - In-memory mode: `jdbc:h2:mem:testdb` (data lost on restart)

Authentication

- **Username**: `albert` (custom user, `sa` is H2's default admin)
- **Password**: `1234` (simple password for development)

JPA/Hibernate Settings

- **`spring.jpa.database-platform=org.hibernate.dialect.H2Dialect`** - Tells Hibernate to use H2-specific SQL syntax
- **`spring.jpa.show-sql=true`** - Enables SQL query logging for debugging
- **`spring.jpa.hibernate.ddl-auto=update`** - Automatically updates database schema without dropping existing data (safer than `create` which recreates tables)

## Tech Stack

- IDE: IntelliJ IDEA 2025.1.3 (Community Edition)
  
  - [Descargar IntelliJ IDEA](https://www.jetbrains.com/es-es/idea/download/?section=linux)
  
  - With [Installing snap on Ubuntu | Snapcraft documentation](https://snapcraft.io/docs/installing-snap-on-ubuntu): `sudo snap install intellij-idea-community --classic`

- Java 21 (or 25, 17, 11, 8)

- JUniit 3.8.1

- Maven Project from https://start.spring.io/
  
  - Dependencies: Spring Web, H2, DevTools, Thymeleaf, JPA

## POM.XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.5.6</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>dev.app</groupId>
    <artifactId>rentingCar-boot</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>rentingCar-boot</name>
    <description>Demo project for Spring Boot for rent a car</description>
    <url/>
    <licenses>
        <license/>
    </licenses>
    <developers>
        <developer/>
    </developers>
    <scm>
        <connection/>
        <developerConnection/>
        <tag/>
        <url/>
    </scm>
    <properties>
        <java.version>21</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <annotationProcessorPaths>
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </path>
                    </annotationProcessorPaths>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```
