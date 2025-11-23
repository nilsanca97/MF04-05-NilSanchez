# BookingRepository Queries Reference Table

| #   | Method Name                                                                                                                                                                                           | Parameters                            | Return Type     | Description                                                                 | Query Type      |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | --------------- | --------------------------------------------------------------------------- | --------------- |
| 0   | [findByBookingDateLessThan](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/repository/BookingRepository.java:13:4-14:61)         | `int bookingDate`                     | `List<Booking>` | Find bookings before a specific date                                        | Spring Data JPA |
| 1   | [findByIsActiveTrue](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/repository/BookingRepository.java:16:4-17:39)                | None                                  | `List<Booking>` | Find all active bookings                                                    | Spring Data JPA |
| 2   | [findByIsActiveFalse](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/repository/BookingRepository.java:19:4-20:40)               | None                                  | `List<Booking>` | Find all inactive/cancelled bookings                                        | Spring Data JPA |
| 3   | [findByCar](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/repository/BookingRepository.java:22:4-23:37)                         | `Car car`                             | `List<Booking>` | Find all bookings for a specific car                                        | Spring Data JPA |
| 4   | [findByClient](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/repository/BookingRepository.java:25:4-26:46)                      | `Client client`                       | `List<Booking>` | Find all bookings for a specific client                                     | Spring Data JPA |
| 5   | [findByBookingDateBetween](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/repository/BookingRepository.java:28:4-29:71)          | `int startDate, int endDate`          | `List<Booking>` | Find bookings within a date range (Unix timestamps)                         | Spring Data JPA |
| 6   | [findByCarAndIsActiveTrue](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/repository/BookingRepository.java:31:4-32:52)          | `Car car`                             | `List<Booking>` | Find only active bookings for a specific car                                | Spring Data JPA |
| 7   | [findByTotalAmountGreaterThan](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/repository/BookingRepository.java:34:4-35:62)      | `double amount`                       | `List<Booking>` | Find bookings with total amount above threshold                             | Spring Data JPA |
| 8   | [findByQtyDays](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/repository/BookingRepository.java:37:4-38:45)                     | `int qtyDays`                         | `List<Booking>` | Find bookings by rental duration (days)                                     | Spring Data JPA |
| 9   | [findOverlappingBookingsForCar](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/repository/BookingRepository.java:40:4-45:78)     | `Car car, int startDate, int endDate` | `List<Booking>` | Find active bookings that overlap with date range for availability checking | Custom JPQL     |
| 10  | [findTop10ByOrderByTotalAmountDesc](cci:1://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/src/main/java/dev/app/rentingCar_boot/repository/BookingRepository.java:47:4-48:54) | None                                  | `List<Booking>` | Get top 10 most expensive bookings                                          | Spring Data JPA |

## **Query Categories**

### **Status Filtering**

- Active/Inactive booking queries (#1, #2, #6)

### **Entity Relationships**

- Car and Client specific queries (#3, #4, #6)

### **Date Operations**

- Date range and comparison queries (#0, #5, #9)

### **Business Analytics**

- Amount and duration based queries (#7, #8, #10)

### **Availability Management**

- Critical overlap detection for car booking conflicts (#9)

## **Special Notes**

- **Query #9** uses Unix timestamp calculations (`qtyDays * 86400`) for date overlap detection
- All date parameters use Unix timestamps (seconds since epoch)
- **Query #9** is essential for implementing car availability checking without data duplication
- **Query #10** uses Spring Data JPA's `Top` keyword with ordering for pagination
