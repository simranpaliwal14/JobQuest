package com.example.job_listing.repository;
import com.example.job_listing.model.JobPost;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface JobPostRepository extends MongoRepository<JobPost, String> {
    // Custom query methods if needed
    // To get the total count of job
    List<JobPost> findByEmployerId(String employerId);
    List<JobPost> findByIdIn(List<String> jobIds);
}


