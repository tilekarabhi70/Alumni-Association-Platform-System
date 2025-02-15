package com.example.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for testing (enable in production)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()   // Public access to authentication APIs
                .requestMatchers("/api/jobs/**").permitAll()// Public access to Job APIs
                .requestMatchers("/{id}/apply").permitAll()
                .requestMatchers("/{id}/save").permitAll()
                .requestMatchers("/api/events/**").permitAll() // Public access to Event APIs
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                //  Posts API
                .requestMatchers("GET", "/api/posts/**").permitAll()  // Public access to view posts
                .requestMatchers("POST", "/api/posts").authenticated() // Only logged-in users can create posts
                .requestMatchers("PUT", "/api/posts/{id}/update").authenticated() // Only logged-in users can update posts
                .requestMatchers("DELETE", "/api/posts/{id}/delete").hasRole("ADMIN") // Only Admins can delete posts
                
                //  Messages API (New)
                .requestMatchers("POST", "/api/messages/**").permitAll() // Only authenticated users can send messages
                .requestMatchers("GET", "/api/messages").permitAll()  // Only authenticated users can fetch their messages
                .requestMatchers("GET", "/api/messages/{conversationId}").authenticated() // Only authenticated users can view a conversation
                // Alumni
                .requestMatchers("/api/alumni/**").permitAll()
                .requestMatchers("/api/alumni/{id}/update").authenticated()
                .requestMatchers("/api/alumni/{id}/delete").hasAuthority("ADMIN")
                //Notification
                .requestMatchers("/api/notifications").permitAll()
                .requestMatchers("/api/messages").permitAll()
                .anyRequest().authenticated()  // Require authentication for other APIs
            );

        return http.build();
    }
}
