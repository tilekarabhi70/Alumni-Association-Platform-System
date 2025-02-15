package com.example.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.project.model.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findBySenderIdOrReceiverIdOrderByTimestamp(Long senderId, Long receiverId);

    List<Message> findByConversationIdOrderByTimestamp(Long conversationId);
}

