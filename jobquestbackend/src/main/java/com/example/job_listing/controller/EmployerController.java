package com.example.job_listing.controller;


import com.example.job_listing.model.Employer;
import com.example.job_listing.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employers")
public class EmployerController {
    @GetMapping("/dashboard")
    public String employerDashboard() {
        return "Employer Dashboard";
    }

    @Autowired
    private EmployerService employerService;

    @PostMapping("/register")
    public ResponseEntity<Employer> registerEmployer(@RequestBody Employer employer) {
        Employer savedEmployer = employerService.registerEmployer(employer);
        return new ResponseEntity<>(savedEmployer, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Employer>> getAllEmployers() {
        List<Employer> employers = employerService.getAllEmployers();
        return new ResponseEntity<>(employers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employer> getEmployerById(@PathVariable String id) {
        Optional<Employer> employer = employerService.getEmployerById(id);
        return employer.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employer> updateEmployer(@PathVariable String id, @RequestBody Employer employer) {
        employer.setId(id);
        Employer updatedEmployer = employerService.updateEmployer(employer);
        return new ResponseEntity<>(updatedEmployer, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployer(@PathVariable String id) {
        employerService.deleteEmployer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

