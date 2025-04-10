import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AlumniRegistration = () => {
  const navigate = useNavigate(); // For redirection

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
  const [errorMessage, setErrorMessage] = useState(""); // Error message handling

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    // Validate email and mobile
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^[0-9]{10}$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Invalid email format");
      return;
    }
    if (!mobileRegex.test(formData.mobile)) {
      setErrorMessage("Invalid mobile number format");
      return;
    }

    try {
      // Send registration data to backend
      const response = await axios.post("http://localhost:8787/api/auth/alumni", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Registration successful! Redirecting to login...");
      navigate("/login"); // Redirect to login page after success
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className="card mx-auto p-4 shadow-lg"
      style={{ maxWidth: "500px", borderRadius: "15px" }}
    >
      <h2 className="text-center mb-4 text-primary font-weight-bold" style={{ fontSize: "24px", fontWeight: "bold", textTransform: "uppercase" }}>
        REGISTER AS AN ALUMNI
      </h2>

      {errorMessage && (
        <div className="alert alert-danger text-center">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Input Fields */}
        {["name", "email", "mobile", "batch", "password", "confirmPassword"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label" style={{ color: "black", textTransform: "uppercase", fontWeight: "bold", fontSize: "16px" }}>
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
                  type={
                    field.includes("password")
                      ? field === "password"
                        ? showPassword ? "text" : "password"
                        : showConfirmPassword ? "text" : "password"
                      : field === "email"
                      ? "email"
                      : "text"
                  }
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
                  onClick={field === "password" ? togglePasswordVisibility : toggleConfirmPasswordVisibility}
                >
                  <FontAwesomeIcon icon={field === "password" ? (showPassword ? faEyeSlash : faEye) : (showConfirmPassword ? faEyeSlash : faEye)} />
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Submit and back buttons */}
        <button className="btn btn-primary w-100 mb-3 btn-lg" type="submit">
          Register
        </button>
        <button className="btn btn-secondary w-100 btn-lg" type="button" onClick={() => navigate("/login")}>
          Back to Login
        </button>
      </form>
    </motion.div>
  );
};

export default AlumniRegistration;
