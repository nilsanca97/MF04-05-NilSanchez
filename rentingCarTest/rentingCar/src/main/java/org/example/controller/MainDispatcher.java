package org.example.controller;

import org.example.dataStore.DataStore;
import org.example.managers.BookingManager;
import org.example.managers.CarManager;
import org.example.managers.ClientManager;
import org.example.utilities.RentingCarTests;
import org.example.utilities.Utilities;
import org.example.views.MainMenuView;

import java.util.Scanner;

public class MainDispatcher {

        public static void runner(DataStore myDataStore ) {

            Scanner scanner = new Scanner(System.in);

            while(true){

                MainMenuView.showMainMenu();
                String option = Utilities.ask(scanner, "Option? ");

                if (option.equals("0")) {
                    break;
                } else if (option.equals("1")){
                    RentingCarTests.testCar();
                } else if (option.equals("2")){
                    CarManager.printCarList(myDataStore.getCars());
                } else if (option.equals("3")){
                    ClientManager.loginClient(myDataStore, scanner);
                } else if (option.equals("4")){
                    if (myDataStore.getLoggedClient() == null)
                        System.out.println("Please login first");
                    else  BookingManager.createBooking(myDataStore, scanner);
                } else if (option.equals("5")){
                    BookingManager.printBookingList(myDataStore.getBookings());
                } else if (option.equals("6")){
                    ClientManager.printClientList(myDataStore.getClients());
                } else {
                    System.out.println("Unknown word");
                }
            }

        }



}

