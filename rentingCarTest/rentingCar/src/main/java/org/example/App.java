package org.example;

import org.example.dataStore.DataStore;
import org.example.controller.MainDispatcher;
import org.example.utilities.FakeDataDBPopulator;

public class App
{
    public static void main( String[] args )
    {
        System.out.println("Starting code...");

        DataStore myDataStore = new DataStore();
        myDataStore.setId("1");
        myDataStore.setLabel("Renting Card Fake DB V1.0");
        long epoch = System.currentTimeMillis()/1000;
        myDataStore.setCreationDate(epoch);
        myDataStore.setLastModification(epoch);
        myDataStore.setActive(true);

        // What? populate DB with fake data
        // How? with a static method we add fake data to the list of cars
        // Why? For What? we need data to init the app
        FakeDataDBPopulator.populateDBByCars(myDataStore);
        //CarManager.printCarList(myDataStore.getCars());
        FakeDataDBPopulator.populateDBByClients(myDataStore);

        // Let's create a
        // super-hardcoded logged client
        // to evaluate the sandbox code app
        // todo: implement view
        // todo: implement login
        // todo: implement logout


        // What? run the app
        // How? with a static method we run the app
        // Why? For What? we need to run the app to test it
        MainDispatcher.runner(myDataStore);


        System.out.println("Finished!");
    }








}
