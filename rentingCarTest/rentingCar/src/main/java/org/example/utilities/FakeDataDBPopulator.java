package org.example.utilities;

import com.github.javafaker.Faker;
import org.example.dataStore.DataStore;
import org.example.model.Car;
import org.example.model.Client;

import java.util.ArrayList;
import java.util.List;

public class FakeDataDBPopulator {

    public static void populateDBByCars(DataStore myDataStore) {

        Faker faker = new Faker();
        List<Car> cars = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            Car myCar = new Car();


            myCar.setId(String.valueOf(faker.number().randomNumber()));
            myCar.setBrand(faker.company().name());
            myCar.setModel(faker.artist().name());
            myCar.setPlate(faker.code().asin());
            myCar.setYear(faker.number().numberBetween(1980, 2024));
            //myCar.setPrice(faker.number().numberBetween(20, 250));
            myCar.setPrice(faker.number().randomDouble(2, 20, 250));

            // add fake car to the DB list
            cars.add(myCar);

            //myDataStore.getCars().add(myCar);
        }



        myDataStore.setCars(cars);

    }

    public static void populateDBByClients(DataStore myDataStore) {

        Faker faker = new Faker();
        List<Client> clients = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            Client myClient = new Client();
            myClient.setId(String.valueOf(faker.number().randomNumber()));
            myClient.setName(faker.name().firstName());
            myClient.setLastName(faker.name().lastName());
            myClient.setAddress(faker.address().fullAddress());
            myClient.setEmail(faker.internet().emailAddress());
            myClient.setPremium(faker.bool().bool());
            myClient.setAge(faker.number().numberBetween(18, 80));
            myClient.setPassword(faker.internet().password());

            // add fake client to the DB list
            clients.add(myClient);
        }

        Client hardcodedClient = new Client();
        hardcodedClient.setId("1000001");
        hardcodedClient.setName("Albert");
        hardcodedClient.setLastName("Doe");
        hardcodedClient.setAddress("123 Main St");
        hardcodedClient.setEmail("albertprofe@gmail.com");
        hardcodedClient.setPremium(true);
        hardcodedClient.setAge(30);
        hardcodedClient.setPassword("1234");

        clients.add(hardcodedClient);


    myDataStore.setClients(clients);

    }
}
