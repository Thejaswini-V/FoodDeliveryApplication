package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.method.AuthorizeReturnObject;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.customerModel;
import com.example.backend.models.deliverypartnerModel;
import com.example.backend.models.restaurantModel;
import com.example.backend.repositories.customerRepository;
import com.example.backend.repositories.deliverypartnerRepository;
import com.example.backend.repositories.restaurantRepository;
import com.example.backend.services.rolesService;


@RestController

@RequestMapping("/api/validation")
public class ValidationController {
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private rolesService rolesService; 
    @Autowired
    private customerRepository customer_repo;
    @Autowired
    private restaurantRepository restaurantRepository;
    @Autowired
    private deliverypartnerRepository deliverypartnerRepository;
    @PostMapping("/forgetPassword")
    public ResponseEntity<String> forget(@RequestParam String email, @RequestParam String password) {
        int role = rolesService.findRole(email);
        if(role == 1){
            customerModel dp = customer_repo.findByCustMail(email);
            dp.setCustPswd(passwordEncoder.encode(password));
            customer_repo.save(dp);
            return ResponseEntity.ok("Updated successfully");
        }
        else if(role == 2){
            restaurantModel dp = restaurantRepository.findByRestMail(email);
            dp.setRestPswd(passwordEncoder.encode(password));
            restaurantRepository.save(dp);
            return ResponseEntity.ok("Updated successfully");
        }
        else if(role == 3){
            deliverypartnerModel dp = deliverypartnerRepository.findByDpMail(email);
            dp.setDpPswd(passwordEncoder.encode(password));
            deliverypartnerRepository.save(dp);
            return ResponseEntity.ok("Updated successfully");
        }
        else {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }

}
