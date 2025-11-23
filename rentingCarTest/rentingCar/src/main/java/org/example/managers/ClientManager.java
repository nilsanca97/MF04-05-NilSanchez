package org.example.managers;

import org.example.dataStore.DataStore;
import org.example.model.Client;
import org.example.model.MinimalClient;
import org.example.views.LoginView;
import java.util.List;
import java.util.Scanner;

public class ClientManager {

    public static void printClientList(List<Client> clients) {

        System.out.println("Clients from DB: ");
        System.out.println("-------------------------");
        System.out.println("Size DB: " + clients.size());
        // print each car on a separate line with index
        int index = 1;
        for (Client client : clients) {
            System.out.println("\t" + index + ". " + client);
            index++;
        }

        System.out.println("\n");

    }

    //public static Client loginClient(String email, String password) {
    public static Client loginClient(DataStore myDataStore, Scanner scanner){

        // invoke view to get minimal client
        MinimalClient minimalClient = LoginView.showLoginView(scanner);
        // validate minimal client
        Client validatedClient = validateLogin(minimalClient, myDataStore);

        if (validatedClient == null) System.out.println("Invalid credentials");
        else {
            myDataStore.setLoggedClient(validatedClient);
            System.out.println("Login successful: " + validatedClient.getEmail());
        }

        return null;
    }

    public static Client validateLogin(MinimalClient minimalClient, DataStore myDataStore){
        // get clients from data store
        List<Client> clients = myDataStore.getClients();
        // validate minimal client
        for (Client client : clients) {
            if (client.getEmail().equals(minimalClient.getEmail()) && client.getPassword().equals(minimalClient.getPassword())) {
                return client;
            }
        }

        return null;

    }
}
