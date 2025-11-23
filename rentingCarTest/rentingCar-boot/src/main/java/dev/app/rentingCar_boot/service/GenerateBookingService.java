package dev.app.rentingCar_boot.service;

import dev.app.rentingCar_boot.model.Car;
import dev.app.rentingCar_boot.model.Client;

public interface GenerateBookingService {

    String generateBooking(Client client, Car car, int bookingDate, int qtyDays);

    double calculateTotalAmount(Car car, int qtyDays);

    boolean checkAvailability(Car car, int bookingDate, int qtyDays);

    boolean checkClient(Client client);

}
