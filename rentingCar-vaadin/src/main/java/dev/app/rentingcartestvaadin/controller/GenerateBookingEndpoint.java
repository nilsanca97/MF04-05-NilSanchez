package dev.app.rentingcartestvaadin.controller;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.app.rentingcartestvaadin.model.Car;
import dev.app.rentingcartestvaadin.model.Client;
import dev.app.rentingcartestvaadin.service.GenerateBooking;
import dev.app.rentingcartestvaadin.repository.ClientRepository;
import dev.app.rentingcartestvaadin.repository.CarRepository;
import com.vaadin.hilla.Endpoint;
import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
@AnonymousAllowed
public class GenerateBookingEndpoint {

    @Autowired
    private GenerateBooking generateBookingService;
    
    @Autowired
    private ClientRepository clientRepository;
    
    @Autowired
    private CarRepository carRepository;

    public String generateBooking(String clientId, String carId, int bookingDate, int qtyDays) {
        try {
            // Fetch managed entities from database
            // and check if they exist, throw exception if not
            Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found with ID: " + clientId));
            
            Car car = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found with ID: " + carId));
            
            return generateBookingService.generateBooking(client, car, bookingDate, qtyDays);
        } catch (Exception e) {
            return "Error generating booking: " + e.getMessage();
        }
    }
}