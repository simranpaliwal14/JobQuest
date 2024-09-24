package com.example.job_listing.controller;
import com.example.job_listing.model.Employee;
import com.example.job_listing.model.JobPost;
import com.example.job_listing.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
    @GetMapping("/dashboard")
    public String employeeDashboard() {
        return "Employee Dashboard";
    }
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/{id}/applied-jobs")
    public ResponseEntity<List<JobPost>> getAppliedJobs(@PathVariable String id) {
        List<JobPost> jobs = employeeService.getAppliedJobs(id);
        return ResponseEntity.ok(jobs);
    }

    @PostMapping("/{id}/apply-job/{jobId}")
    public ResponseEntity<String> applyForJob(@PathVariable String id, @PathVariable String jobId) {
        employeeService.applyForJob(id, jobId);
        return ResponseEntity.ok("Job application submitted successfully.");
    }

    @PutMapping("/{id}/update-profile")
    public ResponseEntity<Employee> updateProfile(@PathVariable String id, @RequestBody Employee updatedEmployee) {
        Employee employee = employeeService.updateProfile(id, updatedEmployee);
        return ResponseEntity.ok(employee);
    }

    @GetMapping("/{id}/check-status/{jobId}")
    public ResponseEntity<String> checkApplicationStatus(@PathVariable String id, @PathVariable String jobId) {
        String status = employeeService.checkApplicationStatus(id, jobId);
        return ResponseEntity.ok(status);
    }

    @PutMapping("/{id}/resume")
    public ResponseEntity<Employee> uploadResume(@PathVariable String id, @RequestBody String resumeContent) {
        Employee employee = employeeService.updateResume(id, resumeContent);
        return ResponseEntity.ok(employee);
    }
}
