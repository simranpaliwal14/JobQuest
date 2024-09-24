package com.example.job_listing.service;

import com.example.job_listing.model.Employer;
import com.example.job_listing.repository.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EmployerService {

    @Autowired
    private EmployerRepository employerRepository;

    public Employer registerEmployer(Employer employer) {
        employer.setCreatedAt(new Date());
        return employerRepository.save(employer);
    }

    public List<Employer> getAllEmployers() {
        return employerRepository.findAll();
    }

    public Optional<Employer> getEmployerById(String id) {
        return employerRepository.findById(id);
    }

    public Employer updateEmployer(Employer employer) {
        return employerRepository.save(employer);
    }

    public void deleteEmployer(String id) {
        employerRepository.deleteById(id);
    }
}

