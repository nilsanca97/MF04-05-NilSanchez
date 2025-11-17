package dev.app.rentingcartestvaadin.service;

import dev.app.rentingcartestvaadin.model.Client;
import dev.app.rentingcartestvaadin.model.Booking;
import dev.app.rentingcartestvaadin.model.Car;
import dev.app.rentingcartestvaadin.model.CarExtras;

import java.util.List;

public interface ModifyBookingService {

    boolean addSecondDriver(Booking booking, Client secondDriver);

    boolean modifyDate (Booking booking, int bookingDate, int qtyDays);

    boolean changeCar(Booking booking, Car newCar);

    boolean cancelBooking(Booking booking);

    boolean modifyStatus(Booking booking);

    boolean updateCarExtras (Booking booking, List<CarExtras> newCarExtras);

}
