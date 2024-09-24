package com.example.job_listing.config;

import com.example.job_listing.model.Role;
import com.example.job_listing.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

    @Bean
    CommandLineRunner init(RoleRepository roleRepository) {
        return args -> {
            if (roleRepository.count() == 0) {
                roleRepository.save(new Role("Admin"));
                roleRepository.save(new Role("Employer"));
                roleRepository.save(new Role("Employee"));
            }
        };
    }
}
