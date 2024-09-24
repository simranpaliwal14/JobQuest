package com.example.job_listing.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Document(collection = "employers")
public class Employer {
    @Id
    private String id;

    @Field("company_name")
    private String companyName;

    @Field("contact_person")
    private String contactPerson;

    @Field("email")
    private String email;

    @Field("password")
    private String password;

    @Field("phone_number")
    private String phoneNumber;

    @Field("address")
    private String address;

    @Field("created_at")
    private Date createdAt = new Date();

    // Constructors, getters, and setters

    public Employer() {
    }

    public Employer(String companyName, String id, String contactPerson, String email, String password, String phoneNumber, String address, Date createdAt) {
        this.companyName = companyName;
        this.id = id;
        this.contactPerson = contactPerson;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
