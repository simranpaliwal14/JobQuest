package com.example.job_listing.service;

import com.example.job_listing.model.JobPost;
import com.example.job_listing.repository.JobPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class JobPostService {

    @Autowired
    private JobPostRepository jobPostRepository;

    public List<JobPost> getAllJobPosts() {
        return jobPostRepository.findAll();
    }

    public Optional<JobPost> getJobPostById(String id) {
        return jobPostRepository.findById(id);
    }

    public JobPost addJobPost(JobPost jobPost) {
        return jobPostRepository.save(jobPost);
    }

    public JobPost updateJobPost(String id, JobPost jobPost) {
        if (jobPostRepository.existsById(id)) {
            jobPost.setId(id);
            return jobPostRepository.save(jobPost);
        }
        return null;
    }

    public void deleteJobPost(String id) {
        jobPostRepository.deleteById(id);
    }

    public List<JobPost> getJobPostsByEmployer(String employerId) {
        return jobPostRepository.findByEmployerId(employerId);
    }

    public List<JobPost> getAllJobs() {
        return jobPostRepository.findAll();
    }

}

