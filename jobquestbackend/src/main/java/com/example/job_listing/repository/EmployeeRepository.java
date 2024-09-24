package com.example.job_listing.repository;

import com.example.job_listing.model.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface EmployeeRepository extends MongoRepository<Employee, String> {

}
