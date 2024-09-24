package com.example.job_listing.controller;

import com.example.job_listing.model.JobApplication;
import com.example.job_listing.service.JobApplicationService;
//import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;


import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000")
public class JobApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;


    // Endpoint to accept an application
    @PostMapping("/{applicationId}/accept")
    public ResponseEntity<String> acceptApplication(@PathVariable String applicationId) {
        jobApplicationService.acceptApplication(applicationId);
        return ResponseEntity.ok("Application accepted");
    }

    // Endpoint to reject an application
    @PostMapping("/{applicationId}/reject")
    public ResponseEntity<String> rejectApplication(@PathVariable String applicationId) {
        jobApplicationService.rejectApplication(applicationId);
        return ResponseEntity.ok("Application rejected");
    }

    // Apply for a job
//    @PostMapping("/apply")
//    public ResponseEntity<JobApplication> applyForJob(@RequestBody JobApplication jobApplication) {
//        JobApplication createdApplication = jobApplicationService.applyForJob(jobApplication);
//        return ResponseEntity.ok(createdApplication);
//    }

    // View jobs applied for a specific job post
    @GetMapping("/job/{jobPostId}")
    public ResponseEntity<List<JobApplication>> getApplicationsByJobPostId(@PathVariable String jobPostId) {
        List<JobApplication> applications = jobApplicationService.getApplicationsByJobPostId(jobPostId);
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/{applicationId}/status")
    public ResponseEntity<String> checkApplicationStatus(@PathVariable String applicationId) {
        String status = jobApplicationService.getApplicationStatus(applicationId);
        if (status != null) {
            return ResponseEntity.ok(status);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Application not found");
        }
    }

    @GetMapping("/applied-jobs")
    public ResponseEntity<List<JobApplication>> getAppliedJobs(@RequestParam("email") String candidateEmail) {
        System.out.println("Received request for email: " + candidateEmail); // Debugging line
        List<JobApplication> applications = jobApplicationService.getApplicationsByCandidateEmail(candidateEmail);
        if (applications.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.ok(applications); // 200 OK with data
    }

    @PostMapping("/apply")
    public ResponseEntity<?> applyForJob(
            @RequestParam("resume") MultipartFile resumeFile,
            @RequestParam("jobPostId") String jobPostId,
            @RequestParam("candidateName") String candidateName,
            @RequestParam("candidateEmail") String candidateEmail) {

        try {
            String resumeUrl = jobApplicationService.saveResume(resumeFile);
            JobApplication jobApplication = new JobApplication();
            jobApplication.setJobPostId(jobPostId);
            jobApplication.setCandidateName(candidateName);
            jobApplication.setCandidateEmail(candidateEmail);
            jobApplication.setResume(resumeUrl);
            jobApplication.setStatus("Applied");

            JobApplication createdApplication = jobApplicationService.applyForJob(jobApplication);
            return ResponseEntity.ok(createdApplication);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Failed to submit the application: " + e.getMessage()));
        }
    }
}
