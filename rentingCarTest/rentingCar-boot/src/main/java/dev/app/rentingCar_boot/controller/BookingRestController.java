package dev.app.rentingCar_boot.controller;

import dev.app.rentingCar_boot.model.Booking;
import dev.app.rentingCar_boot.model.Car;
import dev.app.rentingCar_boot.model.Client;
import dev.app.rentingCar_boot.repository.CarRepository;
import dev.app.rentingCar_boot.repository.ClientRepository;
import dev.app.rentingCar_boot.service.GenerateBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingRestController {

    @Autowired
    private GenerateBookingService generateBookingService;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private CarRepository carRepository;


    @PostMapping("/generateBooking")
    public String generateBooking(
            @RequestParam String clientId,
            @RequestParam String carId,
            @RequestParam int bookingDate,
            @RequestParam int qtyDays){

        // defensive programming
        // check if client and car exist and bookingDate and qty are not null

        Optional<Client> optionalClient = clientRepository.findById(clientId);

        if (optionalClient.isEmpty()) {
            return "Error: Client not found";
        }

        Client client = optionalClient.get();

        Optional<Car> optionalCar = carRepository.findById(carId);

        if (optionalCar.isEmpty()) {
            return "Error: Car not found";
        }

        Car car = optionalCar.get();

        String result =generateBookingService.generateBooking(client, car, bookingDate, qtyDays);



        return result;
    }
}
