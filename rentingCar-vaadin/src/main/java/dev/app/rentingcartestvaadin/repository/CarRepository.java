package dev.app.rentingcartestvaadin.repository;

import dev.app.rentingcartestvaadin.model.Car;
import org.springframework.data.repository.CrudRepository;

public interface CarRepository extends CrudRepository<Car, String> {}
