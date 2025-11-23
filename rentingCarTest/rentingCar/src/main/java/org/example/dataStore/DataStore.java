package org.example.dataStore;

import org.example.model.Booking;
import org.example.model.Car;
import org.example.model.Client;

import java.util.ArrayList;
import java.util.List;

public class DataStore {

        private String id;
        private String label;
        private static List<Car> cars = new ArrayList<>();
        private static List<Client> clients = new ArrayList<>();
        private static List <Booking> bookings = new ArrayList<>();
        private boolean isActive;
        private long creationDate;
        private long lastModification;
        private Client loggedClient;

    public DataStore() {
        this.loggedClient = null;
    }

    public DataStore (String id, List<Car> cars, List<Client> clients, List<Booking> bookings,  int creationDate, int lastModification ){

        this.id = id;
        this.cars = cars;
        this.clients = clients;
        this.bookings = bookings;
        this.isActive = true;
        this.creationDate = creationDate;
        this.lastModification = lastModification;
        this.loggedClient = null;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public  List<Car> getCars() {
        return cars;
    }

    public void setCars(List<Car> cars) {
        this.cars = cars;
    }


    public  List<Client> getClients() {
        return clients;
    }

    public void setClients(List<Client> clients) {
        this.clients = clients;
    }



    public  List<Booking> getBookings() {
        return bookings;
    }



    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public long getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(long creationDate) {
        this.creationDate = creationDate;
    }

    public long getLastModification() {
        return lastModification;
    }

    public void setLastModification(long lastModification) {
        this.lastModification = lastModification;
    }

    public Client getLoggedClient() {
        return loggedClient;
    }

    public void setLoggedClient(Client loggedClient) {
        this.loggedClient = loggedClient;
    }

    public static void setBookings(List<Booking> bookings) {
        DataStore.bookings = bookings;
    }
}
