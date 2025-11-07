# rentingCar v5

`version document: v5.0`

## Goal & Summary

> Rent a car by CLI with client, car, init and ending date, price with Spring Boot
> 
> New Feature: define data-model for **availability by car and dates range.**
> 
> We are adding the view: we are migrating to **Vaadin**

- Reference project: [Spring Boot: H2 DB and Thymeleaf – albertprofe wiki](https://albertprofe.dev/springboot/boot-what-create-th-h2.html)
- Web stack parsing: [rentingCarTest/docs/rentingCar-sprints.md at master · AlbertProfe/rentingCarTest · GitHub](https://github.com/AlbertProfe/rentingCarTest/blob/master/docs/masterdocappends/WebStackParsing.md)
- Spring Boot Project:
  - Microservices: https://spring.io/
  - Spring Boot is open-source: [GitHub - spring-projects/spring-boot: Spring Boot helps you to create Spring-powered, production-grade applications and services with absolute minimum fuss.](https://github.com/spring-projects/spring-boot)
  - Spring Boot Guides / Academy: https://spring.io/guides / https://spring.academy/courses
  - Quickstart: https://spring.io/quickstart
- Vaadin Project:
  - [Vaadin playground](https://start.vaadin.com/app/p)
  - [Vaadin Flow](/springboot/boot-concepts-vaadin-flow.qmd)
  - [Vaadin illa](/springboot/boot-concepts-vaadin-hilla.qmd)
  - [Atmosphere](https://github.com/Atmosphere/atmosphere)

## Version

- [rentingCarTest/docs/rentingCar-sprints.md at master · AlbertProfe/rentingCarTest · GitHub](https://github.com/AlbertProfe/rentingCarTest/blob/master/docs/masterdocappends/rentingCar-sprints.md)

## Tree

```
[Mon Oct 27 08:10:47] albert@albert-VirtualBox:~/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src (master)
$ tree
```

## Vaadin

### Vaadin Migration

You have **two approaches** for adding Vaadin to your car rental project:

**1. Migration Approach:** Add `vaadin-spring-boot-starter` dependency to your existing [pom.xml](cci:7://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/pom.xml:0:0-0:0), remove Thymeleaf dependency, and replace controllers with Vaadin `@Route` views. Your JPA entities, repositories, and services remain untouched. Create new UI components like `Grid`, `Form`, and `Button` for car management and booking interfaces.

**2. Fresh Start Approach:** Create a new Vaadin Spring Boot project using Vaadin's starter template, then copy your existing model classes, repositories, and services. 

- This ensures clean Vaadin integration without legacy dependencies but requires more setup time.

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

```
