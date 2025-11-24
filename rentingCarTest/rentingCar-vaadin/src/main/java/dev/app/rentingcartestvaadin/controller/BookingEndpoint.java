package dev.app.rentingcartestvaadin.controller;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import dev.app.rentingcartestvaadin.model.Booking;
import dev.app.rentingcartestvaadin.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
@AnonymousAllowed
public class BookingEndpoint {

    @Autowired
    BookingService bookingService;

    public Iterable<Booking> getAllBookings() {
        return bookingService.findAll();
    }
    /*private final BookingService bookingService;

    public BookingEndpoint(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    public List<Booking> getAllBookings() {
        return bookingService.findAll();
    }*/
}
