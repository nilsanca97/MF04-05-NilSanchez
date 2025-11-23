package dev.app.rentingCar_boot.mockitotest;

import dev.app.rentingCar_boot.model.Booking;
import dev.app.rentingCar_boot.model.Car;
import dev.app.rentingCar_boot.model.Client;
import dev.app.rentingCar_boot.repository.BookingRepository;
import dev.app.rentingCar_boot.repository.CarRepository;
import dev.app.rentingCar_boot.repository.ClientRepository;
import dev.app.rentingCar_boot.service.GenerateBookingService;
import dev.app.rentingCar_boot.utils.PopulateAllTables;
import dev.app.rentingCar_boot.utils.PopulateBooking;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

//@Transactional
@SpringBootTest
public class BookingTests {

    @Autowired
    private GenerateBookingService generateBookingService;

    //@MockBean
    @MockitoBean
    private BookingRepository bookingRepository;

    //@MockBean
    @MockitoBean
    private CarRepository carRepository;


    @Autowired
    ClientRepository clientRepository;

    @Autowired
    PopulateBooking populateBooking;

    @Autowired
    PopulateAllTables populateAllTables;



    @Test
    public void testFindByBookingDateLessThan() {
        // Arrange - Setup test data
        Booking booking1 = new Booking();
        booking1.setId("booking001");
        booking1.setBookingDate(1767225600); // Jan 1, 2026
        booking1.setQtyDays(3);
        booking1.setTotalAmount(150.0);
        booking1.setActive(true);

        Booking booking2 = new Booking();
        booking2.setId("booking002");
        booking2.setBookingDate(1767312000); // Jan 2, 2026
        booking2.setQtyDays(5);
        booking2.setTotalAmount(250.0);
        booking2.setActive(true);

        Booking booking3 = new Booking();
        booking2.setId("booking003");
        booking2.setBookingDate(1793178503); // October 28, 2026
        booking2.setQtyDays(5);
        booking2.setTotalAmount(250.0);
        booking2.setActive(true);

        List<Booking> expectedBookings = Arrays.asList(booking1, booking2, booking3);

        // When - Mock repository behavior
        when(bookingRepository.findByBookingDateLessThan(anyInt())).thenReturn(expectedBookings);

        // Execute - Call the repository method
        List<Booking> result = bookingRepository.findByBookingDateLessThan(1767398400); // Jan 3, 2026

        // Assert - Verify the results
        assertNotNull(result);
        assertEquals(3, result.size());
        assertEquals("booking001", result.get(0).getId());
        assertEquals("booking002", result.get(2).getId());
        assertEquals(1767225600, result.get(0).getBookingDate());
        assertEquals(1767312000, result.get(2).getBookingDate());

        //
        System.out.println("Result: " + result);
        System.out.println("Size: " + result.size());
        for (Booking booking : result){
            System.out.println("Booking dates: " + booking.getBookingDate());
        }
    }


}
