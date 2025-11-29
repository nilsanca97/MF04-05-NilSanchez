package org.example.managers;

import org.example.dataStore.DataStore;
import org.example.model.Booking;
import org.example.model.Car;
import org.example.model.Client;
import org.example.utilities.Utilities;

import java.util.List;
import java.util.Scanner;

public class BookingManager {

    public static void printBookingList(List<Booking> bookings) {

        System.out.println("Bookings from DB: ");
        System.out.println("-------------------------");
        System.out.println("Size DB: " + bookings.size());
        // print each car on a separate line with index
        int index = 1;
        for (Booking booking : bookings) {
            System.out.println("\t" + index + ". " + booking);
            index++;
        }

        System.out.println("\n");

    }

    public static void createBooking(DataStore myDataStore, Scanner scanner) {
        // todo
        System.out.println("Welcome to Booking Manager");
        System.out.println("-------------------------" );

        System.out.println("Logged client: " + myDataStore.getLoggedClient().getName());
        System.out.println("Logged client ID: " + myDataStore.getLoggedClient().getId());
        System.out.println("Logged client email: " + myDataStore.getLoggedClient().getEmail());

        Booking booking = new Booking();
        booking.setId("0011111");

        String daysRented = Utilities.ask(scanner, "How many days do you want to rent the car? ");
        int intDaysRented = Integer.valueOf(daysRented);

        booking.setDays(intDaysRented);
        booking.setActive(true);
        booking.setClient(myDataStore.getLoggedClient());

        CarManager.printCarList(myDataStore.getCars());

        // todo: implement error handling
        // bug#1: check for valid integer
        // bug#2: check for valid index, withing bounds
        String carIndex = Utilities.ask(scanner, "Car index? ");
        Car selectedCar = myDataStore.getCars().get(Integer.valueOf(carIndex) - 1);

        booking.setPrice(intDaysRented * selectedCar.getPrice());
        booking.setCar(selectedCar);

        // todo: add are you sure?

        myDataStore.getBookings().add(booking);

        System.out.println("Booking created: " + booking.toString());




    }
}
