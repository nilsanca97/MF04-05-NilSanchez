package dev.app.rentingcartestvaadin.controller;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import dev.app.rentingcartestvaadin.model.Car;
import dev.app.rentingcartestvaadin.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Endpoint
@AnonymousAllowed
public class CarEndpoint {

    @Autowired
    CarService carService;


    public List<Car> getAllCars() {
        List<Car> cars = new ArrayList<>();
        for (Car car : carService.findAll()) {
            cars.add(car);
        }
        return cars;
    }

}