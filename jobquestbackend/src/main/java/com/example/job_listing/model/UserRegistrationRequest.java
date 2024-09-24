package com.example.job_listing.model;

import com.example.job_listing.model.User;


public class UserRegistrationRequest {
    private User user;
    private String roleName;

    // Getters and setters
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}

