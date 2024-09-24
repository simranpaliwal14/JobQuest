package com.example.job_listing.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.job_listing.exception.RoleNotFoundException;
import com.example.job_listing.model.Role;
import com.example.job_listing.model.User;
import com.example.job_listing.repository.RoleRepository;
import com.example.job_listing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    public User registerUser(User user, String roleName) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        roles.add(role);
        user.setRoles(roles);
        return userRepository.save(user);
    }


    public User authenticateUser(String username, String password, String roleName) throws Exception {
        // Retrieve user by username
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new Exception("Invalid username, password, or role");
        }

        // Check if the password matches
        boolean passwordMatches = passwordEncoder.matches(password, user.getPassword());
        if (!passwordMatches) {
            throw new Exception("Invalid username, password, or role");
        }

        // Check if the user has the required role by looking at the name field in the roles array
        boolean roleMatches = user.getRoles().stream()
                .anyMatch(role -> role.getName().equals(roleName));
        if (!roleMatches) {
            throw new Exception("Invalid username, password, or role");
        }

        // If all checks pass, return the user
        return user;
    }


    //get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public User updateUser(String id, User userDetails) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setUsername(userDetails.getUsername());
        user.setRoles(userDetails.getRoles());
        // Add more fields as necessary
        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public List<User> getUsersByRole(String roleName) {
        return userRepository.findByRolesName(roleName);
    }



}
