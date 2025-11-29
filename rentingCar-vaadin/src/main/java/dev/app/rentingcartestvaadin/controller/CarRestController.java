package dev.app.rentingcartestvaadin.controller;

import dev.app.rentingcartestvaadin.model.Car;
import dev.app.rentingcartestvaadin.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CarRestController {

    @Autowired
    private CarRepository carRepository;

    @GetMapping("/cars")
    public List<Car> getAllCars() {
        System.out.println("Cars (rest controller api/cars): " + carRepository.findAll());
        return (List<Car>) carRepository.findAll();
    }
}
