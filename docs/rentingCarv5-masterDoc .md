# rentingCar v5

`version document: v5.2`

## Goal & Summary

> Rent a car by CLI with client, car, init and ending date, price with Spring Boot
> 
> New Feature: define data-model for **availability by car and dates range.**
> 
> We are adding the view: we are migrating to **Vaadin**

- Reference project:   
  - Basic project  [Spring Boot: H2 DB and Thymeleaf – albertprofe wiki](https://albertprofe.dev/springboot/boot-what-create-th-h2.html)
  - [Sculptures Wiki](https://github.com/AlbertProfe/sculptures/wiki)
  - [spaceX codesandbox launches](https://codesandbox.io/p/sandbox/fetch-data-example-vqk726)
- Web stack parsing: [rentingCarTest/docs/ at master · AlbertProfe/rentingCarTest · GitHub](https://github.com/AlbertProfe/rentingCarTest/blob/master/docs/masterdocappends/WebStackParsing.md)
- Spring Boot Project:
  - Microservices: https://spring.io/
  - Spring Boot is open-source: [GitHub - spring-projects/spring-boot: Spring Boot helps you to create Spring-powered, production-grade applications and services with absolute minimum fuss.](https://github.com/spring-projects/spring-boot)
  - Spring Boot Guides / Academy: https://spring.io/guides / https://spring.academy/courses
  - Quickstart: https://spring.io/quickstart
- Vaadin Project:
  - [Vaadin playground](https://start.vaadin.com/app/p)
  - [Vaadin Flow](/springboot/boot-concepts-vaadin-flow.qmd)
  - [Vaadin Hilla](/springboot/boot-concepts-vaadin-hilla.qmd)
  - [Atmosphere](https://github.com/Atmosphere/atmosphere)
- Vaadin Enpoints:
  - [Vaadin React AutoCurd](https://vaadin.com/docs/latest/components/auto-crud)
  - [Vaadin endpoints calling Java](https://vaadin.com/docs/latest/hilla/guides/endpoints)

## Commits

- [Commits · AlbertProfe/rentingCarTest · GitHub](https://github.com/AlbertProfe/rentingCarTest/commits/master/)

## Tree

```
st/rentingCar-vaadin (master)
$ tree -L 1
.
├── LICENSE.md
├── mvnw
├── mvnw.cmd
├── node_modules
├── package.json
├── package-lock.json
├── pom.xml
├── README.md
├── src
└── main
|   ├── frontend
|   │   ├── generated
|   │   │   ├── ...
|   │   ├── index.html
|   │   ├── themes
|   │   │   └── rentingcartest-vaadin
|   │   └── views
|   │       ├── bookings.tsx
|   │       ├── cars.tsx
|   │       ├── @index.tsx
|   │       └── @layout.tsx
|   ├── java
|   │   └── dev
|   │       └── app
|   |           └── rentingcartestvaadin
|   |               └── Application.java
|   └── resources
|        ├── application.properties
|        ├── banner.txt
|        └── META-INF
|            └── resources
├── target
├── tsconfig.json
├── types.d.ts
├── vite.config.ts
└── vite.generated.ts



generated:

└── main
    ├── frontend
    │   ├── generated
    │   │   ├── file-routes.json
    │   │   ├── file-routes.ts
    │   │   ├── flow
    │   │   ├── index.tsx
    │   │   ├── jar-resources
    │   │   ├── jsx-dev-transform
    │   │   ├── layouts.json
    │   │   ├── routes.tsx
    │   │   ├── theme.d.ts
    │   │   ├── theme.js
    │   │   ├── theme-rentingcartest-vaadin.components.generated.js
    │   │   ├── theme-rentingcartest-vaadin.generated.js
    │   │   ├── theme-rentingcartest-vaadin.global.generated.js
    │   │   ├── vaadin-featureflags.js
    │   │   ├── vaadin-react.tsx
    │   │   ├── vaadin.ts
    │   │   └── vite-devmode.ts

[Tue Nov 18 08:03:42] albert@albert-VirtualBox:~/MyProjects/Sandbox/rentingCarTest/rentingCar-vaadin/src/main/java/dev/app/rentingcartestvaadin (master)
$ tree -L 3
.
├── Application.java
├── controller
│   ├── BookingRestController.java
│   ├── CarEndpoint.java
│   ├── CarRestController.java
│   └── PopulateRestController.java
├── model
│   ├── Booking.java
│   ├── CarExtras.java
│   ├── Car.java
│   ├── Client.java
│   ├── DrivingCourse.java
│   └── InssuranceCia.java
├── repository
│   ├── BookingRepository.java
│   ├── CarExtrasRepository.java
│   ├── CarRepository.java
│   ├── ClientRepository.java
│   ├── DrivingCourseRepository.java
│   └── InssuranceCiaRepository.java
├── service
│   ├── BookingService.java
│   ├── CarService.java
│   ├── GenerateBooking.java
│   ├── GenerateBookingService.java
│   ├── ModifyBooking.java
│   └── ModifyBookingService.java
└── utils
    ├── GenerateUUID.java
    ├── PopulateAllTables.java
    ├── PopulateBooking.java
    ├── PopulateCar.java
    ├── PopulateClient.java
    ├── PopulateDrivingCourse.java
    └── PopulateStatus.java
```

Project structure

<table style="width:100%; text-align: left;">  
  <tr><th>Directory</th><th>Description</th></tr>  
  <tr><td><code>src/main/frontend/</code></td><td>Client-side source directory</td></tr>  
  <tr><td>    <code>index.html</code></td><td>HTML template</td></tr>  
  <tr><td>    <code>index.ts</code></td><td>Frontend   
entrypoint, bootstraps a React application</td></tr>  
  <tr><td>    <code>routes.tsx</code></td><td>React Router routes definition</td></tr>  
  <tr><td>    <code>MainLayout.tsx</code></td><td>Main   
layout component, contains the navigation menu, uses <a href="https://hilla.dev/docs/react/components/app-layout">  
App Layout</a></td></tr>  
  <tr><td>    <code>views/</code></td><td>UI view   
components</td></tr>  
  <tr><td>    <code>themes/</code></td><td>Custom    
CSS styles</td></tr>  
  <tr><td><code>src/main/java/<groupId>/</code></td><td>Server-side   
source directory, contains the server-side Java views</td></tr>  
  <tr><td>    <code>Application.java</code></td><td>Server entry-point</td></tr>  
</table>

Useful links

- Read the documentation at [hilla.dev/docs](https://hilla.dev/docs/).  
- Ask questions on [Stack Overflow](https://stackoverflow.com/questions/tagged/vaadin) or join our [Forum](https://vaadin.com/forum).  
- Report issues, create pull requests in [GitHub](https://github.com/vaadin/hilla).

## Vaadin

### Vaadin Migration

You have **two approaches** for adding Vaadin to your car rental project:

**1. Migration Approach:** Add `vaadin-spring-boot-starter` dependency to your existing [pom.xml](cci:7://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/pom.xml:0:0-0:0), remove Thymeleaf dependency, and replace controllers with Vaadin `@Route` views. Your JPA entities, repositories, and services remain untouched. Create new UI components like `Grid`, `Form`, and `Button` for car management and booking interfaces.

**2. Fresh Start Approach:** Create a new Vaadin Spring Boot project using Vaadin's starter template, then copy your existing model classes, repositories, and services. 

- This ensures clean Vaadin integration without legacy dependencies but requires more setup time.
- <mark>Vaadin Migration step by step</mark>: [rentingCarTest/docs/ at master · AlbertProfe/rentingCarTest · GitHub](https://github.com/AlbertProfe/rentingCarTest/blob/master/docs/masterdocappends/vaadin-migration.md) 

### Framework of frameworks

`Vaadin Hilla` can be described as a “*framework of frameworks*” because it unifies backend and frontend technologies into one cohesive development model. 

> It blends Spring Boot, TypeScript, and React under a single build system while preserving full-stack type safety and fast productivity.

- Vaadin Hilla sits on top of **Spring Boot**, using its robust Java backend architecture to handle business logic, REST endpoints, and dependency injection.

- It generates **TypeScript interfaces automatically** from Java endpoints, ensuring type-safe communication between client and server.

- The frontend layer combines **React with Vite and npm**, allowing developers to use familiar JavaScript tooling, libraries, and hot-reload development.

- **Hilla endpoints** act as strongly typed bridges: each endpoint method written in Java automatically exposes a TypeScript API for React components without manual REST or GraphQL setup.

- The use of **.tsx files** enables JSX-based UI creation with React syntax, supporting modern web component design.

- **Lumo**, Vaadin’s design system, extends CSS customization to seamlessly style the app, providing both theme variables and reusable UI components.

- Built-in **routing** with React Router integrates smoothly for single-page navigation, giving consistent state handling and URL management.

- For legacy Vaadin apps or hybrid use cases, **Atmosphere** (websocket/push support) can enhance real-time communication between front and back layers.

- **Maven integration** with Spring Boot simplifies dependency management and builds, keeping Java and npm workflows in one streamlined process.

All together, Vaadin Hilla harmonizes multiple open-source ecosystems—Spring, React, Vite, Maven—into a unified “framework of frameworks” that accelerates full-stack development without configuration overhead.

### Atmosphere Framework

> Atmosphere is Vaadin's underlying framework for real-time web communication, providing <mark>WebSocket and Server-Sent Events</mark> support with automatic fallback to long-polling for older browsers. 
> 
> It enables Vaadin's Push feature, allowing server-initiated UI updates without client requests. 

Atmosphere handles:

- connection management, 
- automatic reconnection, 
- and cross-browser compatibility transparently. 

In our car rental app, it would enable real-time availability updates, instant booking notifications, and live dashboard updates across multiple users. 

The framework abstracts the complexity of bidirectional communication, providing annotations like `@Push` to enable real-time features. It ensures reliable message delivery and maintains session state during network interruptions.

### Entry Point React

> The entry point in React for a Vaadin Hilla app is the layout file, usually named `@layout.tsx`. 

It defines the main structure of the web interface using components like `AppLayout`, `Drawer`, and `Outlet`. 

The layout <mark>manages navigation and page rendering</mark>:

- It uses `React Router` to display different views, and signals to control the browser’s title dynamically. 
- The `MainLayout` includes a side navigation menu, a header, and space for nested views. 
- The `Drawer` in Vaadin Hilla’s MainLayout is the side panel that holds the navigation menu and app sections. It toggles open or closed for easy access.
- The `Outlet` is a placeholder where routed pages render. When users navigate, Outlet dynamically loads the corresponding React view inside the main layout.
- When the app runs, this layout acts as the **common wrapper** that loads first and connects all pages inside the React-Vaadin environment.

## UI Low Fidelity Wireframe: Booking Flow

![](https://raw.githubusercontent.com/AlbertProfe/rentingCarTest/refs/heads/master/docs/ui/create_booking.drawio.png)

> This low-fidelity wireframe illustrates the basic user flow for creating and confirming a car booking within the application. It provides a conceptual overview of navigation and key UI components without finalized design styling.

### 1. Home View

- Displays a simple navigation section with the text header “`Home View`”.

- Includes a “BOOKING” button.
  
  - The button navigates the user to the **Home Booking View**.-

### 2. Home Generate Booking View

- Header: “`Home Generate Booking View`”
  - Displays client information (hardcoded as **Albert Profe**).
  - Dropdown for **car selection**.
  - Calendar control for **date selection**.
  - Input field labeled **Qty days** for specifying the number of booking days.
- Action button labeled **Create BOOKING**.
- On click, the flow proceeds to the **Home Result View**.

### 3. Home Result View

- Header: “`Home Result View`”.
- Displays a summary card confirming s`uccessful booking details`:
  - Booking ID
  - Client name
  - Car details
  - Start date
  - Duration
  - Total amount
  - Booking status
- Action button labeled **Go to Booking** for navigating to the booking record or details page.

### Purpose

<mark>The wireframe’s goal is to visualize the key steps and navigation structure</mark> for the car booking process before detailed UI design and implementation. It defines:

- User navigation between views.
- Core interaction elements (buttons, inputs, calendar).
- Output confirmation layout for successful booking creation.

## UI AutoCrud: Cars CRUD

> Auto CRUD is a component that provides CRUD functionality (i.e., Create, Read, Update, Delete) based on a Java backend service. It includes a sortable, filterable and lazy-loaded grid, as well as a form for creating, updating and deleting items.

- https://vaadin.com/docs/latest/components/auto-crud

Code: React comonent view, endpoint and repository:

```java
//HomeView
import { AutoCrud } from '@vaadin/hilla-react-crud';
import CarModel from 'Frontend/generated/dev/app/rentingcartestvaadin/model/CarModel';
import { CarEndpoint } from 'Frontend/generated/endpoints';


import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = { menu: { order: 0, icon: 'line-awesome/svg/home-solid.svg' }, title: 'Home' };

export default function HomeView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <AutoCrud service={CarEndpoint} model={CarModel} />
    </div>
  );
}


//CarEndpoint
@BrowserCallable
@AnonymousAllowed
public class CarEndpoint
        extends CrudRepositoryService<Car, String, CarRepository> {
}


//CarRepository
public interface CarRepository extends CrudRepository<Car, String>, JpaSpecificationExecutor<Car> {}
```

### Current Data Size Analysis

**Response Size**: 45,042 bytes (≈45 KB) for 1,000 cars

- **Per car average**: ~45 bytes per car
- **Content-Type**: JSON format
- **Status**: 200 OK (successful response) 

**Performance Metrics and Network Transfer**:

- **Size**: 45 KB is relatively small for modern web applications
- **Typical load time**: Should be under 1 second on most connections
- **Mobile 3G**: ~0.5-1 seconds
- **Broadband**: ~0.1-0.3 seconds

#### Why It's So Efficient

The response is surprisingly small because of smart optimizations in our [Car](cci:2://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-vaadin/src/main/java/dev/app/rentingcartestvaadin/model/Car.java:16:0-288:1) entity:

1. **`availableDates` Map is `@JsonIgnore`** (line 44) - This prevents the massive 365-entry HashMap from being serialized
2. **Compact summary via `@JsonProperty`** (line 54) - Instead returns `availabilityRanges` using [formatAvailabilityRanges()](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-vaadin/src/main/java/dev/app/rentingcartestvaadin/model/Car.java:182:4-250:5)
3. **`bookings` are `@JsonIgnore`** (line 40) - Prevents lazy loading issues and reduces payload
4. **Range compression** - Groups consecutive dates into readable ranges instead of individual timestamps

## @RestController to populate

```java
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PopulateRestController {

    @Autowired
    private PopulateAllTables populateAllTables;

    @PostMapping("/populate")
    public String populateAllTables(@RequestParam int qty) {
        try {
            return populateAllTables.populateAllTables(qty);
        } catch (Exception e) {
            return "Error populating tables: " + e.getMessage();
        }
    }
}
```

PopulateRestController purpose:

> The [PopulateRestController](cci:2://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-vaadin/src/main/java/dev/app/rentingcartestvaadin/controller/PopulateRestController.java:6:0-22:1) provides a **data seeding endpoint** for development and testing purposes. It exposes a `/api/populate` POST endpoint that accepts a `qty` parameter to generate sample data for the car rental system.

## Car: Vaadin @Endpoint

> Vaadin Hilla’s `@Endpoint` feature offers an efficient way to bridge backend and frontend development, significantly reducing integration time between Java and React. Instead of manually creating REST controllers, defining routes, and writing fetch logic, we can directly expose backend methods as type-safe APIs.
> 
> This approach automatically generates TypeScript clients for each endpoint, allowing React components to call functions like `CarEndpoint.getAllCars()` <mark>as if they were local.</mark>

```java
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import dev.app.rentingcartestvaadin.model.Car;
import dev.app.rentingcartestvaadin.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
@AnonymousAllowed
public class CarEndpoint {

    @Autowired
    CarService carService;

    public Iterable<Car> getAllCars() {
        return carService.findAll();
    }
}
```

React view to show cars just needs to call the Java class `@Endpoint CarsEndpoint` and then the method `getAllCars(`)`:  const carsData = await<mark> CarEndpoint.getAllCars();</mark>

```js
 useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const carsData = await CarEndpoint.getAllCars();
        setCars(Array.from(carsData));
      } catch (err) {
        setError('Failed to fetch cars: ' + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);
```

## Screenshot

First render:

![](https://albertprofe.dev/images/ifcd0021-1-25/hilla-first-render.png)

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

- Vaadin Project from https://vaadin.com/
  
  - Dependencies: Spring Web, H2, DevTools, JPA

## POM.XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <!-- Project from https://start.vaadin.com/project/fcb10613-d4e9-45cb-ba80-7c7ed3de74ee -->
    <groupId>dev.app.rentingcartestvaadin</groupId>
    <artifactId>rentingcartest-vaadin</artifactId>
    <name>rentingcartest-vaadin</name>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <properties>
        <java.version>21</java.version>
        <vaadin.version>24.9.5</vaadin.version>
    </properties>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.5.7</version>
    </parent>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>com.vaadin</groupId>
                <artifactId>vaadin-bom</artifactId>
                <version>${vaadin.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <dependencies>
        <dependency>
            <groupId>com.vaadin</groupId>
            <artifactId>vaadin</artifactId>
        </dependency>
        <dependency>
            <groupId>com.vaadin</groupId>
            <artifactId>vaadin-spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>org.parttio</groupId>
            <artifactId>line-awesome</artifactId>
            <version>2.1.0</version>
        </dependency>

        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>


        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <defaultGoal>spring-boot:run</defaultGoal>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>

            <plugin>
                <groupId>com.vaadin</groupId>
                <artifactId>vaadin-maven-plugin</artifactId>
                <version>${vaadin.version}</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>prepare-frontend</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>com.diffplug.spotless</groupId>
                <artifactId>spotless-maven-plugin</artifactId>
                <version>2.43.0</version>
                <configuration>
                    <java>
                        <palantirJavaFormat>
                            <version>2.50.0</version>
                        </palantirJavaFormat>
                    </java>
                    <typescript>
                        <includes>
                            <include>src/main/frontend/**/*.ts</include>
                            <include>src/main/frontend/**/*.tsx</include>
                        </includes>
                        <excludes>
                            <exclude>src/main/frontend/generated/**</exclude>
                        </excludes>
                        <prettier>
                            <prettierVersion>3.3.3</prettierVersion>
                            <configFile>.prettierrc.json</configFile>
                        </prettier>
                    </typescript>
                </configuration>
            </plugin>
        </plugins>
    </build>

    <profiles>
        <profile>
            <!-- Production mode is activated using -Pproduction -->
            <id>production</id>
            <dependencies>
                <!-- Exclude development dependencies from production -->
                <dependency>
                    <groupId>com.vaadin</groupId>
                    <artifactId>vaadin-core</artifactId>
                    <exclusions>
                        <exclusion>
                            <groupId>com.vaadin</groupId>
                            <artifactId>vaadin-dev</artifactId>
                        </exclusion>
                    </exclusions>
                </dependency>
            </dependencies>
            <build>
                <plugins>
                    <plugin>
                        <groupId>com.vaadin</groupId>
                        <artifactId>vaadin-maven-plugin</artifactId>
                        <version>${vaadin.version}</version>
                        <executions>
                            <execution>
                                <goals>
                                    <goal>build-frontend</goal>
                                </goals>
                            </execution>
                        </executions>
                    </plugin>
                </plugins>
            </build>
        </profile>
    </profiles>
</project>
```
