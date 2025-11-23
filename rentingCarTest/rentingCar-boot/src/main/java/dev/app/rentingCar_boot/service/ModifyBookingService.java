package dev.app.rentingCar_boot.service;

import ch.qos.logback.core.net.server.Client;
import dev.app.rentingCar_boot.model.Booking;
import dev.app.rentingCar_boot.model.Car;
import dev.app.rentingCar_boot.model.CarExtras;

import java.util.List;

public interface ModifyBookingService {

    boolean addSecondDriver(Booking booking, Client secondDriver);

    boolean modifyDate (Booking booking, int bookingDate, int qtyDays);

    boolean changeCar(Booking booking, Car newCar);

    boolean cancelBooking(Booking booking);

    boolean modifyStatus(Booking booking);

    boolean updateCarExtras (Booking booking, List<CarExtras> newCarExtras);

}
