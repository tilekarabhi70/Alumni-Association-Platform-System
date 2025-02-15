package com.example.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.model.Message;
import com.example.project.repository.MessageRepository;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public Message sendMessage(Long senderId, Long receiverId, String content, Long conversationId) {
        Message message = new Message(senderId, receiverId, content, conversationId);
        return messageRepository.save(message);
    }

    public List<Message> getUserMessages(Long userId) {
        return messageRepository.findBySenderIdOrReceiverIdOrderByTimestamp(userId, userId);
    }

    public List<Message> getMessagesByConversation(Long conversationId) {
        return messageRepository.findByConversationIdOrderByTimestamp(conversationId);
    }
}
