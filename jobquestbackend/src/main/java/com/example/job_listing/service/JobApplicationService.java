package com.example.job_listing.service;

import com.example.job_listing.model.JobApplication;
import com.example.job_listing.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;


@Service
public class JobApplicationService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    // Get applications by job post ID
    public List<JobApplication> getApplicationsByJobPostId(String jobPostId) {
        return jobApplicationRepository.findByJobPostId(jobPostId);
    }

    // Accept a job application
    public void acceptApplication(String applicationId) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setStatus("Accepted");
        jobApplicationRepository.save(application);
    }

    // Reject a job application
    public void rejectApplication(String applicationId) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setStatus("Rejected");
        jobApplicationRepository.save(application);
    }


    public void shortlistApplication(String applicationId) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setStatus("Shortlisted");
        jobApplicationRepository.save(application);
    }

    // Apply for a job
    public JobApplication applyForJob(JobApplication jobApplication) {
        return jobApplicationRepository.save(jobApplication);
    }

    public String getApplicationStatus(String applicationId) {
        // Find the job application by ID
        JobApplication jobApplication = jobApplicationRepository.findById(applicationId).orElse(null);

        // Check if the job application exists and return the status
        if (jobApplication != null) {
            return jobApplication.getStatus();
        } else {
            return null; // or throw a custom exception if needed
        }
    }

    public List<JobApplication> getApplicationsByCandidateEmail(String candidateEmail) {
        List<JobApplication> applications = jobApplicationRepository.findByCandidateEmail(candidateEmail);
        System.out.println("Applications found: " + applications); // Debugging line
        return applications;
    }

    public String saveResume(MultipartFile file) {
        try {
            // Directory where the file will be stored (local directory)
            String uploadDir = "uploads/resumes/";
            String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);

            // Save the file to the specified directory
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Return the URL path, making sure to use forward slashes for URLs
            return "/uploads/resumes/" + fileName.replace("\\", "/");  // Ensure forward slashes
        } catch (IOException e) {
            throw new RuntimeException("Failed to store resume file", e);
        }
    }

}
