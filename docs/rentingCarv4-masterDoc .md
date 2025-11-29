# rentingCar v4

`version document: v4.0`

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
[Mon Oct 27 08:10:47] albert@albert-VirtualBox:~/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src (master)
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
│   │               │   ├── BookingService.java
│   │               │   ├── CarService.java
│   │               │   └── GenerateBooking.java
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

19 directories, 35 files
```

## Interface

### Summary

- [rentingCarTest/docs/masterdocappends/Java-Interface.md at master · AlbertProfe/rentingCarTest · GitHub](https://github.com/AlbertProfe/rentingCarTest/blob/master/docs/masterdocappends/Java-Interface.md)

#### Interface definition (5-yo)

> Imagine a magic toy box that helps people rent cars! The GenerateBookingService is like a special list of instructions for the toy box. It tells the box how to make a car rental plan for someone. It has three important jobs: first, it makes a booking by checking if a car is free and saving the plan. Second, it figures out how much money the rental costs. Third, it checks if the car is available when someone wants it. These instructions make sure the toy box works smoothly to help people rent cars easily!

#### Interface definition (tech)

> The `GenerateBookingService` interface, defined in the `dev.app.rentingCar_boot.service` package, provides a contract for managing car rental bookings in a Spring Boot application. It declares three methods: `generateBooking(Client client, Car car, int bookingDate, int qtyDays)` orchestrates booking creation, validating inputs, checking availability, calculating costs, and persisting bookings via `BookingRepository`. It returns a formatted string with booking details. The `calculateTotalAmount(Car car, int qtyDays)` method computes the rental cost using the car's price and duration. The `checkAvailability(Car car, int bookingDate, int qtyDays)` method verifies car availability by inspecting the `availableDates` map, ensuring no conflicts for the requested period.

Based on our `GenerateBooking` class, We'll create a corresponding interface that declares all the public methods present in the class. The interface will define the contract for the booking-related operations without providing their implementation.

Here's the interface for the `GenerateBooking` class:

```java
package dev.app.rentingCar_boot.service;

import dev.app.rentingCar_boot.model.Car;
import dev.app.rentingCar_boot.model.Client;

public interface GenerateBookingService {

    String generateBooking(Client client, Car car, int bookingDate, int qtyDays);

    double calculateTotalAmount(Car car, int qtyDays);

    boolean checkAvailability(Car car, int bookingDate, int qtyDays);
}
```

Explanation:

- **Package**: The interface is placed in the same package (`dev.app.rentingCar_boot.service`) as the `GenerateBooking` class to maintain consistency.
- **Imports**: Only the necessary imports are included (`Car` and `Client` for the method parameters).
- **Method Declarations**:
  - `generateBooking(Client client, Car car, int bookingDate, int qtyDays)`: Declares the main method to create a booking and return a formatted string with booking details.
  - `calculateTotalAmount(Car car, int qtyDays)`: Declares the method to calculate the total amount for a booking based on the car and number of days.
  - `checkAvailability(Car car, int bookingDate, int qtyDays)`: Declares the method to check if a car is available for the requested booking period.
- **Excluded Methods**: The `updateCarAvailability` and `formatUnixTimestamp` methods are not included in the interface because they are `private` in the `GenerateBooking` class and thus are implementation details, not part of the public contract.
- **Naming Convention**: The interface is named `GenerateBookingService` to follow Spring naming conventions, where service interfaces often end with `Service` to clearly indicate their role.
- **Annotations**: No annotations are needed in the interface since `@Service` and `@Autowired` are implementation-specific and belong in the `GenerateBooking` class.
- **Access Modifiers**: Interface methods are implicitly `public` and `abstract`, so explicit access modifiers are not required.

> This interface provides a clear contract for the `GenerateBooking` class, ensuring that any implementation must include these public methods. If you have specific requirements, such as renaming the interface or including additional methods, let me know, and I can adjust the interface accordingly!  

To demonstrate how to use the `generateBooking` method from the `GenerateBookingService` interface, I'll provide an example that shows how to call this method in a Spring-based application. The example assumes you have a Spring Boot application with the necessary dependencies and configurations (e.g., Spring Data JPA, repositories, and entities for `Car`, `Client`, and `Booking`). I'll create a simple scenario where a client books a car, using a controller or a test class to invoke the `generateBooking` method.

### Example: Using `generateBooking` in a Spring Controller

Below is an example of how you might use the `GenerateBookingService` interface in a Spring REST controller to handle a booking request.

```java
package dev.app.rentingCar_boot.controller;

import dev.app.rentingCar_boot.model.Car;
import dev.app.rentingCar_boot.model.Client;
import dev.app.rentingCar_boot.repository.CarRepository;
import dev.app.rentingCar_boot.repository.ClientRepository;
import dev.app.rentingCar_boot.service.GenerateBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private GenerateBookingService generateBookingService;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private CarRepository carRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createBooking(
            @RequestParam String clientId,
            @RequestParam String carId,
            @RequestParam int bookingDate,
            @RequestParam int qtyDays) {

        // Fetch client and car from repositories
        Optional<Client> clientOptional = clientRepository.findById(clientId);
        Optional<Car> carOptional = carRepository.findById(carId);

        // Validate that client and car exist
        if (clientOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Client not found");
        }
        if (carOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Car not found");
        }

        Client client = clientOptional.get();
        Car car = carOptional.get();

        // Ensure car has an initialized availableDates map
        if (car.getAvailableDates() == null) {
            car.setAvailableDates(new HashMap<>());
        }

        // Call the generateBooking method from the service
        String result = generateBookingService.generateBooking(client, car, bookingDate, qtyDays);

        // Return the result
        return ResponseEntity.ok(result);
    }
}
```

#### Explanation of the Example:

1. **Controller Setup**:
   
   - The `BookingController` is a REST controller mapped to `/api/bookings`.
   - It uses dependency injection to autowire the `GenerateBookingService`, `ClientRepository`, and `CarRepository`.

2. **Endpoint**:
   
   - The `/create` endpoint accepts `clientId`, `carId`, `bookingDate` (Unix timestamp), and `qtyDays` as request parameters.
   - It fetches the `Client` and `Car` entities from their respective repositories using the provided IDs.

3. **Validation**:
   
   - Checks if the client and car exist. If not, it returns a 400 Bad Request response with an error message.
   - Ensures the car's `availableDates` map is initialized to avoid null pointer issues.

4. **Calling `generateBooking`**:
   
   - The `generateBooking` method is invoked with the retrieved `Client`, `Car`, `bookingDate`, and `qtyDays`.
   - The method handles all the logic (validation, availability check, booking creation, and car availability update) and returns a formatted string with booking details.

5. **Response**:
   
   - The controller returns the result as a `ResponseEntity` with a 200 OK status if successful, or a 400 Bad Request status if validation fails.

Example Input and Output:

**Sample Request** (using a tool like Postman or cURL):

```
POST /api/bookings/create
Parameters:
- clientId: "client123"
- carId: "car456"
- bookingDate: 1767225600 (e.g., Unix timestamp for 01/01/2026)
- qtyDays: 3
```

**Sample Client and Car Data** (assumed to exist in the database):

- **Client**:
  
  ```java
  Client client = new Client();
  client.setId("client123");
  client.setName("John");
  client.setLastName("Doe");
  ```

- **Car**:
  
  ```java
  Car car = new Car();
  car.setId("car456");
  car.setBrand("Toyota");
  car.setModel("Corolla");
  car.setPlate("ABC123");
  car.setPrice(50.0);
  car.setAvailableDates(new HashMap<>()); // Initially empty, assumed available
  ```

**Sample Output** (if the car is available and booking is successful):

```
Booking successfully created!
Booking ID: booking789
Client: John Doe
Car: Toyota Corolla (ABC123)
Start Date: 01/01/2026
Duration: 3 days
Total Amount: €150.00
Status: Active
```

**Error Output** (if the car is not available):

```
Error: Car is not available for the requested dates
```

#### Prerequisites:

- The `Client`, `Car`, and `Booking` entities must be properly defined with the fields used in the `GenerateBooking` class (e.g., `name`, `lastName` for `Client`; `brand`, `model`, `plate`, `price`, `availableDates` for `Car`).
- The `ClientRepository` and `CarRepository` must extend `JpaRepository` or similar to provide `findById` methods.
- The database must be set up with Spring Data JPA and configured to store `Client, Car, and Booking` entities.
- The `GenerateBookingService` implementation (i.e., `GenerateBooking` class) must be properly wired in the Spring context.

### Example: Using `generateBooking` in a Test Class

- [rentingCarTest/docs/masterdocappends/Junit-mock-testing-guide.md at master · AlbertProfe/rentingCarTest · GitHub](https://github.com/AlbertProfe/rentingCarTest/blob/master/docs/masterdocappends/junit-mock-testing-guide.md)

If you want to test the `generateBooking` method directly, you could use a unit test with mocked repositories:

```java
package dev.app.rentingCar_boot.service;

import dev.app.rentingCar_boot.model.Booking;
import dev.app.rentingCar_boot.model.Car;
import dev.app.rentingCar_boot.model.Client;
import dev.app.rentingCar_boot.repository.BookingRepository;
import dev.app.rentingCar_boot.repository.CarRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.HashMap;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
public class GenerateBookingServiceTest {

    @Autowired
    private GenerateBookingService generateBookingService;

    @MockBean
    private BookingRepository bookingRepository;

    @MockBean
    private CarRepository carRepository;

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

        // Mock repository behavior
        when(bookingRepository.save(any(Booking.class))).thenReturn(booking);
        when(carRepository.save(any(Car.class))).thenReturn(car);

        // Call the service
        String result = generateBookingService.generateBooking(client, car, 1767225600, 3);

        // Verify the result
        assertTrue(result.contains("Booking successfully created"));
        assertTrue(result.contains("Booking ID: booking789"));
        assertTrue(result.contains("Client: John Doe"));
        assertTrue(result.contains("Car: Toyota Corolla (ABC123)"));
        assertTrue(result.contains("Total Amount: €150.00"));
    }
}
```

#### Notes:

- **Dependencies**: The test example uses JUnit 5 and Mockito for mocking repositories. Ensure you have `spring-boot-starter-test` in your project.
- **Timestamp**: The `bookingDate` is a Unix timestamp (seconds since epoch). In the example, `1767225600` corresponds to January 1, 2026, in UTC.
- **Error Handling**: The `generateBooking` method includes defensive programming to handle invalid inputs (null client, null car, invalid days, etc.), which is reflected in the controller's response handling.
- **Customization**: If you need a different format for the input (e.g., JSON payload instead of query parameters) or additional validation, let me know, and I can adjust the example.

## Feature `ModifyBookingService`

> This interface promotes clean architecture by providing a well-defined contract for booking modifications while maintaining flexibility for different implementation strategies.

`ModifyBookingService` interface, why using this interface design is beneficial:

**Separation of Concerns**

- **Single Responsibility**: Each method handles one specific booking modification operation
- **Clear Purpose**: Interface focuses solely on booking modifications, not creation or retrieval

**Maintainability & Flexibility**

- **Implementation Independence**: Multiple implementations can exist (database, in-memory, external API)
- **Easy Testing**: Can create mock implementations for unit testing
- **Future Extensions**: New modification operations can be added without breaking existing code

**Method Design Benefits**: Granular Operations

- `addSecondDriver()` - Handles driver additions separately from other modifications
- `modifyDate()` - Dedicated date/duration changes with availability validation
- `changeCar()` - Car swapping with proper availability checks
- `updateCarExtras()` - Manages additional services independently

**Method Design Benefits**: Clear Return Types

- **Boolean returns** provide immediate success/failure feedback
- Simple to understand and handle in calling code
- Consistent pattern across all operations

**Method Design Benefits**:  Business Logic Alignment

Based on the memories about car availability and booking management, this interface aligns well with:

- **Date range validation** (for `modifyDate()`)
- **Car availability checks** (for `changeCar()`)
- **Booking state management** (for `modifyStatus()` and `cancelBooking()`)

**Method Design Benefits:** Integration Benefits

- **Service Layer Pattern**: Fits well with Spring Boot architecture
- **Transaction Management**: Each method can be wrapped in appropriate transactions
- **Error Handling**: Consistent approach to handling modification failures

### Code

```java
public interface ModifyBookingService {

    boolean addSecondDriver(Booking booking, Client secondDriver);

    boolean modifyDate (Booking booking, int bookingDate, int qtyDays);

    boolean changeCar(Booking booking, Car newCar);

    boolean cancelBooking(Booking booking);

    boolean modifyStatus(Booking booking);

    boolean updateCarExtras (Booking booking, List<CarExtras> newCarExtras);

}
```

## Spring Data JPA Query Derived/Creation Methods

- [rentingCarTest/docs/masterdocappends/BookingRepository_Queries.md at master · AlbertProfe/rentingCarTest · GitHub](https://github.com/AlbertProfe/rentingCarTest/blob/master/docs/masterdocappends/BookingRepository_Queries.md)
- [JPA Query Methods :: Spring Data JPA](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html#jpa.query-methods.query-creation)
- [Spring Boot: JPA Queries – albertprofe wiki](https://albertprofe.dev/springboot/boot-concepts-jpa-4.html)
- [rentingCarTest/docs/masterdocappends/DerivedQueryStructure.md at master · AlbertProfe/rentingCarTest · GitHub](https://github.com/AlbertProfe/rentingCarTest/blob/master/docs/masterdocappends/DerivedQueryStructure.md)

### Definition: Query Derived

> **Spring Data JPA Query Creation** is a mechanism that automatically generates database queries from method names in repository interfaces. 
> 
> By following naming conventions, developers can create queries without writing SQL or JPQL code. The framework parses method names like `findByEmailAddressAndLastname` and translates them into equivalent queries: `select u from User u where u.emailAddress = ?1 and u.lastname = ?2`. 

Supported keywords include `And`, `Or`, `Between`, `LessThan`, `GreaterThan`, `Like`, `IsNull`, `OrderBy`, and many others. Each keyword maps to specific SQL operations, enabling complex queries through descriptive method names. This approach reduces boilerplate code, improves readability, and leverages Spring's property traversal for nested object queries, making database operations more intuitive and maintainable.

JPA Connection:

- **JPA (Java Persistence API)** is the specification
- **Spring Data JPA** implements derived queries on top of JPA
- Derived queries get translated to **JPQL (Java Persistence Query Language)** or **Criteria API** calls
- The syntax and grammar used in derived queries is called:
  - **"Spring Data JPA Query Derivation DSL"** (Domain Specific Language)
- Key Components:
  - **Query Subject**: `find`, `read`, `get`, `query`, `stream`
  - **Predicate Keywords**: `By`, `And`, `Or` 
  - **Property Expressions**: Entity property names
  - **Condition Keywords**: `LessThan`, `GreaterThan`, `Between`, `Like`, `IsNull`
  - **Modifiers**: `Distinct`, `Top`, `First`
  - **Ordering**: `OrderBy`

### Grammar Pattern

```
[QuerySubject][Distinct][Top/First][PropertyExpression][Predicate][OrderBy]
```

 **Examples from Our Repository**

```java
findByIsActiveTrue()              // find + By + IsActive + True
findByBookingDateBetween()        // find + By + BookingDate + Between  
findTop10ByOrderByTotalAmountDesc() // find + Top10 + By + OrderBy + TotalAmount + Desc
```

**Translation Process**

Derived Query → **JPQL** → **SQL**

```
findByCarAndIsActiveTrue(Car car) 
↓
SELECT b FROM Booking b WHERE b.car = ?1 AND b.isActive = true
↓  
SELECT * FROM booking WHERE car_fk = ? AND is_active = true
```

> The grammar is specifically designed for **JPA entities** and follows **JavaBean property naming conventions**.

## Addressing the circular reference in Car <> CarExtras

A **circular reference** occurs when two objects reference each other, creating an endless loop during serialization.

In our example:

- `Car` contains a list of `CarExtras`

- Each `CarExtras` has a `carFK` field pointing back to its parent `Car`

Check this document to see how we address this issue:

- [rentingCarTest/docs/masterdocappends/circular-reference.md at master · AlbertProfe/rentingCarTest · GitHub](https://github.com/AlbertProfe/rentingCarTest/blob/master/docs/masterdocappends/circular-reference.md)

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
