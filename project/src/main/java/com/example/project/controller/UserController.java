package com.example.project.controller;

import com.example.project.model.Role;
import com.example.project.model.User;
import com.example.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

 // Register API
    


    // ✅ Register Alumni API
    @CrossOrigin("http://localhost:3000")
    @PostMapping("/alumni")
    public ResponseEntity<?> registerAlumni(@RequestBody User user) {
        if (userService.findUserByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already registered!");
        }

        if (!user.getPassword().equals(user.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords do not match!");
        }

        // Automatically set the role as ALUMNI
        user.setRole(Role.ALUMNI);
        User newUser = userService.registerUser(user);
        return ResponseEntity.ok(newUser);
    }

    @CrossOrigin("http://localhost:3000")
    @PostMapping("/student")
    public ResponseEntity<?> registerStudent(@RequestBody User user) {
        if (userService.findUserByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already registered!");
        }

        if (!user.getPassword().equals(user.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords do not match!");
        }

        // Automatically set the role as STUDENT
        user.setRole(Role.STUDENT);
        User newUser = userService.registerUser(user);
        return ResponseEntity.ok(newUser);
    }



    // Login API
    @CrossOrigin("http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Optional<User> user = userService.loginUser(email, password);
        if (user.isPresent()) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials!");
        }
    }

    // Forgot Password API
    @CrossOrigin("http://localhost:3000")
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");

        Optional<User> user = userService.findUserByEmail(email);
        if (user.isPresent()) {
            User updatedUser = user.get();
            updatedUser.setPassword(passwordEncoder.encode(newPassword));
            userService.registerUser(updatedUser);
            return ResponseEntity.ok("Password reset successful!");
        } else {
            return ResponseEntity.status(404).body("User not found!");
        }
    }

    // Logout API (Just a placeholder, usually handled in frontend)
    @PostMapping("/logout")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> logoutUser() {
        return ResponseEntity.ok("Logout successful!");
    }
    
    @GetMapping("/profile")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<User> getLoggedInUserProfile(@RequestParam String email) {
        System.out.println("Received request for email: " + email);
        Optional<User> user = userService.findUserByEmail(email);
        System.out.println("User found: " + user.isPresent());
        
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }


}
