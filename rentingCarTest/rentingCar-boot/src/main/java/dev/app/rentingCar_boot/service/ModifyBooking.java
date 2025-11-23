package dev.app.rentingCar_boot.service;

import ch.qos.logback.core.net.server.Client;
import dev.app.rentingCar_boot.model.Booking;
import dev.app.rentingCar_boot.model.Car;
import dev.app.rentingCar_boot.model.CarExtras;

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
