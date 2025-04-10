package com.example.project.service;

import org.springframework.stereotype.Service;

import com.example.project.model.Job;
import com.example.project.model.User;
import com.example.project.repository.JobRepository;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // Create a new job posting
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    // Fetch all jobs
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // Fetch job by ID
    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    // Update a job posting
    public Optional<Job> updateJob(Long id, Job updatedJob) {
        return jobRepository.findById(id).map(existingJob -> {
            existingJob.setTitle(updatedJob.getTitle());
            existingJob.setCompany(updatedJob.getCompany());
            existingJob.setLocation(updatedJob.getLocation());
            existingJob.setType(updatedJob.getType());
            existingJob.setDescription(updatedJob.getDescription());
            return jobRepository.save(existingJob);
        });
    }

    // Delete a job posting
    public boolean deleteJob(Long id) {
        if (jobRepository.existsById(id)) {
            jobRepository.deleteById(id);
            return true;
        }
        return false;
    }
//    public boolean saveJobForUser(Long jobId, Long userId) {
//        Optional<Job> jobOptional = jobRepository.findById(jobId);
//        Optional<User> userOptional = userRepository.findById(userId);
//
//        if (jobOptional.isPresent() && userOptional.isPresent()) {
//            User user = userOptional.get();
//            Job job = jobOptional.get();
//
//            user.getSavedJobs().add(job); // Assuming User has a Set<Job> savedJobs
//            userRepository.save(user);
//            return true;
//        }
//        return false;
//    }

  
    public boolean applyToJob(Long jobId, String userId) {
        Optional<Job> jobOptional = jobRepository.findById(jobId);
        if (jobOptional.isPresent()) {
            Job job = jobOptional.get();
            job.getAppliedUsers(); // Add user to applied users list
            jobRepository.save(job);
            return true;
        }
        return false;
    }

    
    public boolean saveJob(Long jobId, String userId) {
        Optional<Job> jobOptional = jobRepository.findById(jobId);
        if (jobOptional.isPresent()) {
            Job job = jobOptional.get();
            job.getSavedUsers(); // Add user to saved users list
            jobRepository.save(job);
            return true;
        }
        return false;
    }

//   
//    public boolean unsaveJob(Long jobId, String userId) {
//        Optional<Job> jobOptional = jobRepository.findById(jobId);
//        if (jobOptional.isPresent()) {
//            Job job = jobOptional.get();
//            job.getSavedUsers().remove(userId); // Remove user from saved users list
//            jobRepository.save(job);
//            return true;
//        }
//        return false;
//    }

}
