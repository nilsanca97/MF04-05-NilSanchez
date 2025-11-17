package dev.app.rentingcartestvaadin.service;

import dev.app.rentingcartestvaadin.model.Client;
import dev.app.rentingcartestvaadin.model.Booking;
import dev.app.rentingcartestvaadin.model.Car;
import dev.app.rentingcartestvaadin.model.CarExtras;

import java.util.List;

public class ModifyBooking implements ModifyBookingService {


    @Override
    public boolean addSecondDriver(Booking booking, Client secondDriver) {
        return false;
    }

    @Override
    public boolean modifyDate(Booking booking, int bookingDate, int qtyDays) {
        return false;
    }

    @Override
    public boolean changeCar(Booking booking, Car newCar) {
        return false;
    }

    @Override
    public boolean cancelBooking(Booking booking) {
        return false;
    }

    @Override
    public boolean modifyStatus(Booking booking) {
        return false;
    }

    @Override
    public boolean updateCarExtras(Booking booking, List<CarExtras> newCarExtras) {
        return false;
    }
}
