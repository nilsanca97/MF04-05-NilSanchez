package dev.app.rentingcartestvaadin.controller;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import dev.app.rentingcartestvaadin.model.Booking;
import dev.app.rentingcartestvaadin.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Endpoint
@AnonymousAllowed
public class BookingEndpoint {

    @Autowired
    BookingService bookingService;

    //return List
    public List<Booking> getAllBookings() {
        List<Booking> bookings = new ArrayList<>();
        for (Booking booking : bookingService.findAll()) {
            bookings.add(booking);
        }
        return bookings;
    }
}

    /*
    private final BookingService bookingService;

    public BookingEndpoint(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    public List<Booking> getAllBookings() {
        return (List<Booking>) bookingService.findAll();
    }
}*/
