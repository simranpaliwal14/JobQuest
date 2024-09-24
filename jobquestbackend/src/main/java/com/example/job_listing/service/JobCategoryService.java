package com.example.job_listing.service;

import com.example.job_listing.model.JobCategory;
import com.example.job_listing.repository.JobCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobCategoryService {

    @Autowired
    private JobCategoryRepository jobCategoryRepository;

    // Get all job categories
    public List<JobCategory> getAllJobCategories() {
        return jobCategoryRepository.findAll();
    }

    // Add a new job category
    public JobCategory addJobCategory(JobCategory jobCategory) {
        return jobCategoryRepository.save(jobCategory);
    }

    // Update an existing job category
    public JobCategory updateJobCategory(String id, JobCategory jobCategory) {
        Optional<JobCategory> existingCategory = jobCategoryRepository.findById(id);
        if (existingCategory.isPresent()) {
            jobCategory.setId(id);
            return jobCategoryRepository.save(jobCategory);
        } else {
            throw new RuntimeException("Job Category not found with id " + id);
        }
    }

    // Delete a job category
    public void deleteJobCategory(String id) {
        jobCategoryRepository.deleteById(id);
    }

    // Get a specific job category by ID
    public JobCategory getJobCategoryById(String id) {
        return jobCategoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job Category not found with id " + id));
    }
}


