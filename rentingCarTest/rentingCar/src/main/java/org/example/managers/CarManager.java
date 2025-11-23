package org.example.managers;

import org.example.model.Car;

import java.util.List;

public class CarManager {


    public static void printCarList(List<Car> cars) {

        System.out.println("Cars from DB: ");
        System.out.println("-------------------------");
        System.out.println("Size DB: " + cars.size());
        // print each car on a separate line with index
        int index = 1;
        for (Car car : cars) {
            System.out.println("\t" + index + ". " + car);
            index++;
        }

        System.out.println("\n");
    }
}
