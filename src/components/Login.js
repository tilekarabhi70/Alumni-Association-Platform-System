import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import AlumniRegistration from './AlumniRegistration';
import StudentRegistration from './StudentRegistration';
import Contact from './Contact';

const Login = () => {
  const [page, setPage] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8787/api/auth/login', { email, password });
      if (response.data === "Login successful!") {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const renderPage = () => {
    switch (page) {
      case 'student':
        return <StudentRegistration redirectToLogin={() => setPage('login')} />;
      case 'alumni':
        return <AlumniRegistration redirectToLogin={() => setPage('login')} />;
      case 'contact':
        return <Contact />;
      case 'login':
      default:
        return (
          <motion.div
            key="login-page"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="container py-5 d-flex justify-content-center align-items-center min-vh-100"
          >
            <div className="bg-white p-4 rounded shadow-lg w-100" style={{ maxWidth: '370px' }}>
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3 position-relative">
                  <label htmlFor="loginEmail" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control ps-4 border-2"
                    id="loginEmail"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3 position-relative">
                  <label htmlFor="loginPassword" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control ps-4 border-2"
                    id="loginPassword"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="form-text">Password should be at least 8 characters long.</div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    onClick={() => navigate('/forgot')}
                    className="text-primary"
                    style={{ fontSize: '0.9rem' }}
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mb-3"
                  style={{ transition: 'background-color 0.3s ease' }}
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <div className="text-center mt-3">
                <p>
                  Not a member?{' '}
                  <span
                    onClick={() => navigate('/student')}
                    className="text-primary cursor-pointer"
                    style={{ cursor: 'pointer' }}
                  >
                    Register as Student
                  </span>{' '}
                  or{' '}
                  <span
                    onClick={() => navigate('/alumni')}
                    className="text-primary cursor-pointer"
                    style={{ cursor: 'pointer' }}
                  >
                    Alumni
                  </span>
                </p>
                <p>
                  <span
                    onClick={() => navigate('/admin')}
                    className="text-primary cursor-pointer"
                    style={{ cursor: 'pointer' }}
                  >
                    <FaUserShield size={20} /> Register as Admin
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url(/images/jonatan-pie-h8nxGssjQXs-unsplash.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
      }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container py-5">
        <AnimatePresence exitBeforeEnter>
          {renderPage()}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;