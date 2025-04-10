package com.example.project.repository;
import com.example.project.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByEventDateAfter(LocalDateTime now);
    List<Event> findByEventDateBefore(LocalDateTime now);
}

