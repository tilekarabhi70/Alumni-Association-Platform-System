// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PostProvider } from './context/PostContext'; // Import PostProvider
import './App.css';
import AlumniRegistration from './components/AlumniRegistration';
import Contact from './components/Contact';
import StudentRegistration from './components/StudentRegistration';
import Login from './components/Login';
import MessageComponent from './components/MessageComponent';
import JobPage from './components/JobPage';
import MyNetwork from './components/MyNetwork';
import Notifications from './components/Notifications';
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';
import ForgotPassword from './components/ForgotPassword';
import Front from './components/Front';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleBack = () => {
    setIsRegistered(false);
  };

  const handleRegister = () => {
    setIsRegistered(true);
  };

  return (
    <PostProvider> {/* Wrap the entire app with PostProvider */}
      <Router>
        <div className="App">
          <Routes>
            <Route path="/dashboard" element={<Contact />} />
            <Route path="/messages/:username" element={<MessageComponent />} />
            <Route path="/jobs" element={<JobPage />} />
            <Route path="/myNetwork" element={<MyNetwork />} />
            <Route path="/notification" element={<Notifications />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/alumni" element={<AlumniRegistration />} />
            <Route path="/student" element={<StudentRegistration />} />
            <Route path="/" element={<Front />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </PostProvider>
  );
}

export default App;