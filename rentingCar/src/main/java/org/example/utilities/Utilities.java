package org.example.utilities;

import java.util.Scanner;

public class Utilities {

    public static String ask(Scanner scanner, String textToAsk) {
        // utitlity method to ask for input
        System.out.println(textToAsk);
        return scanner.nextLine();
    }
}
