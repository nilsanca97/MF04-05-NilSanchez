package dev.app.rentingcartestvaadin.repository;

import dev.app.rentingcartestvaadin.model.CarExtras;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CarExtrasRepository extends CrudRepository<CarExtras, String> {
    
    List<CarExtras> findByAvailable(boolean available);
    List<CarExtras> findByCategory(String category);
    List<CarExtras> findByAvailableAndCategory(boolean available, String category);
}
