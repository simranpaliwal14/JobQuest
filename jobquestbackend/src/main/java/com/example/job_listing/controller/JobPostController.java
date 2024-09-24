package com.example.job_listing.controller;

import com.example.job_listing.model.JobApplication;
import com.example.job_listing.model.JobPost;
import com.example.job_listing.service.JobApplicationService;
import com.example.job_listing.service.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000") // Ensure CORS is enabled
public class JobPostController {

    @Autowired
    private JobPostService jobPostService;

    @GetMapping("/all")
    public ResponseEntity<List<JobPost>> getAllJobs() {
        List<JobPost> jobs = jobPostService.getAllJobs();
        return ResponseEntity.ok(jobs);
    }

    @GetMapping
    public List<JobPost> getAllJobPosts() {
        return jobPostService.getAllJobPosts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobPost> getJobPostById(@PathVariable String id) {
        Optional<JobPost> jobPost = jobPostService.getJobPostById(id);
        return jobPost.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<JobPost> addJobPost(@RequestBody JobPost jobPost) {
        JobPost createdJobPost = jobPostService.addJobPost(jobPost);
        return ResponseEntity.ok(createdJobPost);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobPost> updateJobPost(@PathVariable String id, @RequestBody JobPost jobPost) {
        JobPost updatedJobPost = jobPostService.updateJobPost(id, jobPost);
        return updatedJobPost != null ? ResponseEntity.ok(updatedJobPost) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobPost(@PathVariable String id) {
        jobPostService.deleteJobPost(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/employer/{employerId}")
    public ResponseEntity<List<JobPost>> getJobPostsByEmployer(@PathVariable String employerId) {
        List<JobPost> jobPosts = jobPostService.getJobPostsByEmployer(employerId);
        return ResponseEntity.ok(jobPosts);
    }



    @Autowired
    private JobApplicationService jobApplicationService;

    @GetMapping("/{jobPostId}/applications")
    public List<JobApplication> getApplicationsByJobPostId(@PathVariable String jobPostId) {
        return jobApplicationService.getApplicationsByJobPostId(jobPostId);
    }

    @PostMapping("/{jobPostId}/applications/{applicationId}/shortlist")
    public void shortlistApplication(@PathVariable String applicationId) {
        jobApplicationService.shortlistApplication(applicationId);
    }

    @PostMapping("/{jobPostId}/applications/{applicationId}/reject")
    public void rejectApplication(@PathVariable String applicationId) {
        jobApplicationService.rejectApplication(applicationId);
    }

    @PostMapping("/applications/{applicationId}/accept")
    public void acceptApplication(@PathVariable String applicationId) {
        jobApplicationService.acceptApplication(applicationId);
    }


}
