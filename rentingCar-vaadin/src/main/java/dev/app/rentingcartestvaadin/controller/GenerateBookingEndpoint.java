package dev.app.rentingcartestvaadin.controller;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.app.rentingcartestvaadin.model.Car;
import dev.app.rentingcartestvaadin.model.Client;
import dev.app.rentingcartestvaadin.service.GenerateBooking;
import com.vaadin.hilla.Endpoint;
import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
@AnonymousAllowed
public class GenerateBookingEndpoint {

    @Autowired
    private GenerateBooking generateBookingService;


    public String generateBooking(Client client, Car car, int bookingDate, int qtyDays) {
        try {
            return generateBookingService.generateBooking(client, car, bookingDate, qtyDays);
        } catch (Exception e) {
            return "Error generating booking: " + e.getMessage();
        }
    }
}