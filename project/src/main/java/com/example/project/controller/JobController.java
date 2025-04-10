package com.example.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.project.model.Job;
import com.example.project.service.JobService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // 1. POST /api/jobs - Post a new job/internship
    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> postJob(@RequestBody Job job) {
        Job newJob = jobService.createJob(job);
        return ResponseEntity.ok(newJob);
    }

    // 2. GET /api/jobs - Fetch all jobs/internships
    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> jobs = jobService.getAllJobs();
        return ResponseEntity.ok(jobs);
    }

    // 3. GET /api/jobs/{id} - Fetch job/internship details
    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> getJobById(@PathVariable Long id) {
        Optional<Job> job = jobService.getJobById(id);
        return job.map(ResponseEntity::ok)
                  .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 4. PUT /api/jobs/{id}/update - Update job/internship (only posted by alumni/admin)
    @PutMapping("/{id}/update")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> updateJob(@PathVariable Long id, @RequestBody Job updatedJob) {
        Optional<Job> job = jobService.updateJob(id, updatedJob);
        return job.map(ResponseEntity::ok)
                  .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 5. DELETE /api/jobs/{id}/delete - Delete a job/internship post
    @DeleteMapping("/{id}/delete")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        boolean deleted = jobService.deleteJob(id);
        if (deleted) {
            return ResponseEntity.ok("Job deleted successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 6. POST /api/jobs/{id}/apply - Apply to a job
    @PostMapping("/{id}/apply")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
    public ResponseEntity<?> applyToJob(@PathVariable Long id, @RequestParam String userId) {
        boolean applied = jobService.applyToJob(id, userId);
        if (applied) {
            return ResponseEntity.ok("Applied to job successfully!");
        } else {
            return ResponseEntity.badRequest().body("Failed to apply to job.");
        }
    }

    // 7. POST /api/jobs/{id}/save - Save a job for a user
    @PostMapping("/{id}/save")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> saveJob(@PathVariable Long id, @RequestParam String userId) {
        boolean saved = jobService.saveJob(id, userId);
        if (saved) {
            return ResponseEntity.ok("Job saved successfully!");
        } else {
            return ResponseEntity.badRequest().body("Failed to save job.");
        }
    }

//    // 8. DELETE /api/jobs/{id}/unsave - Unsave a job for a user
//    @DeleteMapping("/{id}/unsave")
//    @CrossOrigin(origins = "http://localhost:3000")
//    public ResponseEntity<?> unsaveJob(@PathVariable Long id, @RequestParam String userId) {
//        boolean unsaved = jobService.unsaveJob(id, userId);
//        if (unsaved) {
//            return ResponseEntity.ok("Job unsaved successfully!");
//        } else {
//            return ResponseEntity.badRequest().body("Failed to unsave job.");
//        }
//    }
}