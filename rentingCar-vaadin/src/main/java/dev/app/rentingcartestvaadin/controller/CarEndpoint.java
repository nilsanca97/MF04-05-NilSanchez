package dev.app.rentingcartestvaadin.controller;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import dev.app.rentingcartestvaadin.model.Car;
import dev.app.rentingcartestvaadin.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
@AnonymousAllowed
public class CarEndpoint {

    @Autowired
    CarService carService;

    public Iterable<Car> getAllCars() {
        return carService.findAll();
    }
}