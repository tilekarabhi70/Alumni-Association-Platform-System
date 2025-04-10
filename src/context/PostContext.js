// src/context/PostContext.js
import React, { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);

  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

  const deletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const addEvent = (event) => {
    setEvents([event, ...events]);
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <PostContext.Provider value={{ posts, addPost, deletePost, events, addEvent, deleteEvent }}>
      {children}
    </PostContext.Provider>
  );
};