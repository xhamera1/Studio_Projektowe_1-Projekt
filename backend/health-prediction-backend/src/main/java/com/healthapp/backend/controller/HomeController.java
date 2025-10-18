package com.healthapp.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
