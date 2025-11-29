package org.example.views;

public class MainMenuView {

    public static void showMainMenu() {

        // todo: when clint is logged in, show different menu
        // todo: when clint is not logged in, show different menu

        System.out.println("\n");
        System.out.println("Main Menu");
        System.out.println("-------------------------");
        System.out.println("1. Execute tests");
        System.out.println("2. Print all cars");
        System.out.println("3. Fake Login client");
        System.out.println("4. Rent a car, create booking");
        System.out.println("5. Print all bookings");
        System.out.println("6. Print all clients");
        System.out.println("0. Exit");
        System.out.println("\n");

    }

    public static void template() {
        System.out.println("\n");
        System.out.println(" Menu");
        System.out.println("-------------------------");
        System.out.println("1. Option #1");
        System.out.println("2. Option #2");
        System.out.println("3. Option #3");
        System.out.println("4. Option #4");
        System.out.println("0. Exit");
        System.out.println("\n");

    }
}