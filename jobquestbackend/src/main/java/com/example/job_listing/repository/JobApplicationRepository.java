package com.example.job_listing.repository;

import com.example.job_listing.model.JobApplication;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface JobApplicationRepository extends MongoRepository<JobApplication, String> {
    List<JobApplication> findByCandidateEmail(String candidateEmail);
    List<JobApplication> findByJobPostId(String jobPostId);


}