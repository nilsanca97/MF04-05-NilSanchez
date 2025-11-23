package org.example.utilities;

import com.github.javafaker.Faker;
import org.example.managers.CarManager;
import org.example.dataStore.DataStore;
import org.example.model.Booking;
import org.example.model.Car;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class RentingCarTests {

    public static void testCar() {

        System.out.println("Testing car...");
        int mateo = 2;
        System.out.println("This is mateo: " + mateo);

        Car bmw001 = new Car("1", "BMW", "M3", "1234", 2022, 100.0);
        System.out.println("This is my BMW: " + bmw001.toString());
        Car bmw002 = new Car("2", "BMW", "M3", "5678", 2021, 50.0);
        System.out.println("This is my Mazda: " + bmw002.toString());

        // let's print the brand of the first car
        System.out.println("My brand: " + bmw001.getBrand());

        Car bmw003 = new Car();
        bmw003.setBrand("BMW");
        bmw003.setYear(2000);

        System.out.println("This is the age of the car: " + bmw003.carAge());

        // carAge() is a method of the Car class
        // therefore it needs to be called on an instance of the Car class
        //carAge();

        // The next line will throw an error because the constructor is not defined
        //Car bmw004 = new Car("3", "BMW");
    }

    public static void testBooking() {

        System.out.println("Testing booking...");

        Car bmw001 = new Car("1", "BMW", "M3", "1234", 2022, 100.0);
        Booking book001 = new Booking();
        book001.setId("1");
        book001.setCar(bmw001);
        book001.setDays(5);
        book001.setPrice(500.0);
        book001.setActive(true);

        System.out.println("This is my booking: " + book001.toString());


    }

    public static void TestFaker() {

        Faker faker = new Faker();

        String name = faker.cat().breed().toString();

        System.out.println(name);
    }

    public static void testList() {
        ArrayList<Car> cars = new ArrayList<Car>();

        Car bmw001 = new Car("1", "BMW", "M3", "1234", 2022, 100.0);
        cars.add(bmw001);

        cars.add(new Car("2", "BMW", "M3", "1234", 2022, 100.0));
    }

    public static void createFakeCarListTest() {


        ArrayList<Car> cars = new ArrayList<>();
        Faker faker = new Faker();

        for (int i = 0; i < 100; i++) {
            // create a car object
            Car myCar = new Car();
            // set fake data
            myCar.setId(String.valueOf(faker.number().randomNumber()));
            myCar.setBrand(faker.company().name());
            myCar.setModel(faker.artist().name());
            myCar.setPlate(faker.code().asin());
            myCar.setYear(faker.number().numberBetween(1980, 2024));
            myCar.setPrice(faker.number().numberBetween(20, 250));
            // add myCar to the list
            cars.add(myCar);
        }

        System.out.println("\n");
        System.out.println("This is my list of cars: ");
        System.out.println("-------------------------");
        System.out.println("The list has " + cars.size() + " cars");
        System.out.println("\n");

        // Print each car on a separate line
        for (Car car : cars) {
            System.out.println("\t" + car);
        }
        System.out.println("\n");
    }

    public static void myDataStoreTest() {


        DataStore myDataStoreTest = new DataStore();

        Car myCar = new Car();
        myCar.setId("1");
        myCar.setBrand("BMW");
        myCar.setModel("M3");
        myCar.setPlate("A123DFGR4");
        myCar.setYear(2022);

        Car myCar2 = new Car();
        myCar2.setId("2");
        myCar2.setBrand("Mazda");
        myCar2.setModel("Mazda 3");
        myCar2.setPlate("B123DFGR4");
        myCar2.setYear(2021);

        myDataStoreTest.getCars().add(myCar);
        myDataStoreTest.getCars().add(myCar2);

        CarManager.printCarList(myDataStoreTest.getCars());

        myDataStoreTest.getCars().get(0).setPlate("1111111");

        CarManager.printCarList(myDataStoreTest.getCars());




    }

    public static void createAndPrintEpoch() {

        long epoch = System.currentTimeMillis()/1000;

        System.out.println("Epoch 1: " + epoch);

        String date = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(new Date(epoch * 1000L));
        System.out.println("Creation Date epoch1 to date: " + date);

        try {
            long epoch2 = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").parse("01/02/1972 01:00:00").getTime() / 1000L;
            System.out.println("Epoch 2: " + epoch2);
        } catch (java.text.ParseException e) {
            System.err.println("Error parsing date: " + e.getMessage());
            e.printStackTrace();
        }
    }
}