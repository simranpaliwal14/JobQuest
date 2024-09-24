package com.example.job_listing.controller;

import com.example.job_listing.model.LoginRequest;
import com.example.job_listing.model.User;
import com.example.job_listing.model.UserRegistrationRequest;
import com.example.job_listing.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;
import com.example.job_listing.repository.UserRepository;

import javax.management.relation.RoleNotFoundException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Api(tags = "Authentication Controller", description = "Endpoints for user registration and login")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;




    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationRequest registrationRequest) {
        User user = registrationRequest.getUser();
        String roleName = registrationRequest.getRoleName();

        try {
            userService.registerUser(user, roleName);
            return ResponseEntity.ok("User registered successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate user with username, password, and role
            User authenticatedUser = userService.authenticateUser(
                    loginRequest.getUsername(),
                    loginRequest.getPassword(),
                    loginRequest.getRole()
            );

            // If authentication is successful, return the authenticated user (or a token, or other data)
            return ResponseEntity.ok(authenticatedUser);

        } catch (Exception e) {
            // Return a 401 Unauthorized status with an error message
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }




    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @ApiIgnore
    @RequestMapping(value = "/")
    public void redirect(HttpServletResponse response) throws IOException {
        response.sendRedirect("/swagger-ui.html");
    }
}
