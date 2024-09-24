package com.example.job_listing.service;

import com.example.job_listing.exception.ResourceNotFoundException;
import com.example.job_listing.model.Employee;
import com.example.job_listing.model.JobPost;
import com.example.job_listing.repository.EmployeeRepository;
import com.example.job_listing.repository.JobPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private JobPostRepository jobPostRepository;

    // Get employee by ID
    public Optional<Employee> getEmployeeById(String employeeId) {
        return employeeRepository.findById(employeeId);
    }





    public List<JobPost> getAppliedJobs(String employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow();
        return jobPostRepository.findByIdIn(employee.getAppliedJobIds());
    }

    public void applyForJob(String employeeId, String jobId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow();
        employee.getAppliedJobIds().add(jobId);
        employeeRepository.save(employee);
    }

    public Employee updateProfile(String employeeId, Employee updatedEmployee) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + employeeId));

        // Update first name and last name separately
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());

        // Update email and phone number
        employee.setEmail(updatedEmployee.getEmail());
        employee.setPhoneNumber(updatedEmployee.getPhoneNumber());

        // Update other fields as necessary

        // Save the updated employee to the repository
        return employeeRepository.save(employee);
    }


    public String checkApplicationStatus(String employeeId, String jobId) {
        // Example logic to determine application status
        // This could be more complex, depending on your requirements
        Employee employee = employeeRepository.findById(employeeId).orElseThrow();
        if (employee.getAppliedJobIds().contains(jobId)) {
            return "Application submitted";
        }
        return "No application found";
    }

    public Employee updateResume(String employeeId, String resumeContent) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow();
        employee.setResume(resumeContent);
        return employeeRepository.save(employee);
    }
}
