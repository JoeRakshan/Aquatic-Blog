import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './LoginPage.css';
import dolphinImage from './assets/bg.jpg'; // Import the image

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook for redirection

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(''); // Clear errors on toggle
  };

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        // Redirect to ProfilePage on successful login
        navigate('/profile');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Something went wrong!');
    }
  };

  // Handle signup form submission
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        // Redirect to login form after successful signup
        setIsLogin(true);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Something went wrong!');
    }
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${dolphinImage})` }}>
      <div className="form-container">
        {isLogin ? (
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  required 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} 
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              {error && <p className="error-message">{error}</p>} {/* Display error message */}
              <div>
                <input type="submit" value="Login" />
              </div>
            </form>
            <p>
              Don't have an account?{' '}
              <button onClick={toggleForm} className="toggle-button">
                Sign Up
              </button>
            </p>
          </div>
        ) : (
          <div className="signup-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUpSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
              <div>
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  required 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} 
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              {error && <p className="error-message">{error}</p>} {/* Display error message */}
              <div>
                <input type="submit" value="Sign Up" />
              </div>
            </form>
            <p>
              Already have an account?{' '}
              <button onClick={toggleForm} className="toggle-button">
                Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
