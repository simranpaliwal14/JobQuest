package com.example.job_listing.repository;
import com.example.job_listing.model.JobCategory;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface JobCategoryRepository extends MongoRepository<JobCategory, String>{
    JobCategory findByName(String name);
}
