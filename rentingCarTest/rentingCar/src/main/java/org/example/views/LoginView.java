package org.example.views;

import org.example.model.MinimalClient;
import org.example.utilities.Utilities;

import java.util.Scanner;

public class LoginView {

    public static MinimalClient showLoginView(Scanner scanner) {

        System.out.println("\n");
        System.out.println("Login View");

        String email = Utilities.ask(scanner, "E-mail? ");
        String password = Utilities.ask(scanner, "Password? ");

        MinimalClient minimalClient = new MinimalClient(email, password);

        return minimalClient;



    }
}
