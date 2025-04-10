import React, { useState } from "react";
import { motion } from "framer-motion";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate hook

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8787/api/auth/forgot-password", {
        email,
        newPassword,
      });

      console.log("Response data:", response.data); 
      message.success("Password reset successful!");

      // Redirect to Login page after successful reset
      navigate("/login");

    } catch (error) {
      console.error("Reset error:", error);
      setError("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 50 }}
      className="container py-5 d-flex justify-content-center align-items-center min-vh-100 bg-light"
    >
      <div className="bg-white p-4 rounded shadow-lg w-100" style={{ maxWidth: '370px' }}>
        <h2 className="text-center mb-4">Forgot Password</h2>
        <form onSubmit={handleReset}>
          <div className="mb-3 position-relative">
            <label htmlFor="resetEmail" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control ps-4 border-2"
              id="resetEmail"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input
              type="password"
              className="form-control ps-4 border-2"
              id="newPassword"
              placeholder="Enter your new password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 mb-3"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
