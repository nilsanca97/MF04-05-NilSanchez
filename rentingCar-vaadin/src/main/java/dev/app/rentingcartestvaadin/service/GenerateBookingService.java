package dev.app.rentingcartestvaadin.service;

import dev.app.rentingcartestvaadin.model.Car;
import dev.app.rentingcartestvaadin.model.Client;

public interface GenerateBookingService {

    String generateBooking(Client client, Car car, int bookingDate, int qtyDays);

    double calculateTotalAmount(Car car, int qtyDays);

    boolean checkAvailability(Car car, int bookingDate, int qtyDays);

    boolean checkClient(Client client);

}
