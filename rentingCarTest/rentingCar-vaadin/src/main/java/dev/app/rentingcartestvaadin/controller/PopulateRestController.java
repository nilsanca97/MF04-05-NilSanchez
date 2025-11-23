package dev.app.rentingcartestvaadin.controller;

import dev.app.rentingcartestvaadin.utils.PopulateAllTables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PopulateRestController {

    @Autowired
    private PopulateAllTables populateAllTables;

    @PostMapping("/populate")
    public String populateAllTables(@RequestParam int qty) {
        try {
            return populateAllTables.populateAllTables(qty);
        } catch (Exception e) {
            return "Error populating tables: " + e.getMessage();
        }
    }
}
