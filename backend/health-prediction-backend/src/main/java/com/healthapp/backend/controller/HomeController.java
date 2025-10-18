package com.healthapp.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "elo 123";
    }

    @GetMapping("/api/status")
    public String status() {
        return "elo z api status 123";
    }
}
