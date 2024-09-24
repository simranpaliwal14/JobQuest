package com.example.job_listing.repository;

import com.example.job_listing.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);

    List<User> findByRolesName(String roleName);
}

