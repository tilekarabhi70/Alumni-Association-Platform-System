import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import axios from "axios"; // You need axios to make HTTP requests
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for React Router v6

const StudentRegistration = () => {
  const navigate = useNavigate();  // Hook for navigation

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    batch: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Validate email and mobile if needed (e.g., regular expression)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^[0-9]{10}$/;
    if (!emailRegex.test(formData.email)) {
      alert("Invalid email format");
      return;
    }
    if (!mobileRegex.test(formData.mobile)) {
      alert("Invalid mobile number format");
      return;
    }

    try {
      // Replace with your backend API URL
      const response = await axios.post("http://localhost:8787/api/auth/student", formData);
      alert(response.data);  // Handle success response
      redirectToLogin();  // Redirect to login on successful registration
    } catch (error) {
      console.error("There was an error with registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const redirectToLogin = () => {
    navigate("/login");  // Redirect to the login page using React Router's navigate hook
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        className="card mx-auto p-4 shadow-lg my-5"
        style={{
          maxWidth: "500px",
          width: "60%",
          margin: "auto",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h2 className="text-center mb-4 text-primary font-weight-bold" style={{ fontSize: "24px", fontWeight: "bold", textTransform: "uppercase" }}>
          REGISTER AS A STUDENT
        </h2>
        <form onSubmit={handleSubmit}>
          {["name", "email", "mobile", "batch", "password", "confirmPassword"].map((field) => (
            <div className="mb-3" key={field}>
              <label
                className="form-label text-dark"
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {field.replace(/([A-Z])/g, " $1")}:
              </label>
              <div className="input-group">
                {field === "batch" ? (
                  <input
                    type="month"
                    name="batch"
                    className="form-control shadow-sm"
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <input
                    type={field.includes("password") && (field === "password" ? !showPassword : !showConfirmPassword) ? "password" : field === "email" ? "email" : "text"}
                    name={field}
                    className="form-control shadow-sm"
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                )}
                {field.includes("password") && (
                  <span
                    className="input-group-text cursor-pointer"
                    onClick={field === "password" ? handlePasswordVisibility : handleConfirmPasswordVisibility}
                  >
                    <FontAwesomeIcon icon={field === "password" ? (showPassword ? faEyeSlash : faEye) : (showConfirmPassword ? faEyeSlash : faEye)} />
                  </span>
                )}
              </div>
            </div>
          ))}
          <div className="d-flex flex-column gap-2">
            <button className="btn btn-primary w-100 mb-3 btn-lg" type="submit">
              Register
            </button>
            <button
              className="btn btn-secondary w-100 btn-lg"
              type="button"
              onClick={redirectToLogin}  // Calling the redirectToLogin function
            >
              Back to Login
            </button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default StudentRegistration;
