package com.example.job_listing.repository;

import com.example.job_listing.model.Employer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployerRepository extends MongoRepository<Employer, String> {
    Optional<Employer> findByEmail(String email);

}
