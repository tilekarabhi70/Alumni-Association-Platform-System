package com.example.project.controller;

import com.example.project.model.User;
import com.example.project.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/alumni")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // 8. Fetch all alumni with optional filters
    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<User>> getAllAlumni(
//    		@RequestParam(required = false) String email,
            @RequestParam(required = false) String batch,
            @RequestParam(required = false) String role) {
        return ResponseEntity.ok(adminService.getAllAlumni(batch, role));
    }

    // 9. Fetch a specific alumni profile
    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<User> getAlumniById(@PathVariable Long id) {
        Optional<User> user = adminService.getAlumniById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/search")//search?name=abhi
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<User>> searchAlumni(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String batch) {
        
        List<User> users = adminService.searchAlumni(name, email, batch);
        
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 No Content if no users found
        }
        
        return ResponseEntity.ok(users);
    }


    // 10. Edit alumni details (Admin-only or user-specific)
    @PutMapping("/{id}/update")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<User> updateAlumni(@PathVariable Long id, @RequestBody User userDetails) {
        return ResponseEntity.ok(adminService.updateAlumni(id, userDetails));
    }

    // 11. Remove alumni profile (Admin-only)
    @DeleteMapping("/{id}/delete")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Void> deleteAlumni(@PathVariable Long id) {
    	adminService.deleteAlumni(id);
        return ResponseEntity.noContent().build();
    }
}

