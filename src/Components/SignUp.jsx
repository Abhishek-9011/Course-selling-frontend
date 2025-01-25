import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';  // Import the CSS file

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const url = isAdmin ? 'http://localhost:3000/admin/signup' : 'http://localhost:3000/user/signup';

    try {
      const response = await axios.post(url, { 
        username, 
        email, 
        password 
      });
      alert('Registration successful! You can now log in.');
    } catch (error) {
      console.error('Sign-up failed:', error);
      alert('Sign-up failed. Please try again.');
    }

    console.log(username);
    console.log(email);
    console.log(password);
    console.log(isAdmin ? 'Admin' : 'User');
  };

  return (
    <form onSubmit={handleSignUp} className="sign-up-form">
      <h2 className="sign-up-title">Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="sign-up-input"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="sign-up-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="sign-up-input"
      />
      <div className="admin-checkbox">
        <input 
          type="checkbox" 
          id="admin" 
          checked={isAdmin} 
          onChange={() => setIsAdmin(!isAdmin)} 
          className="admin-checkbox-input"
        />
        <label htmlFor="admin" className="admin-checkbox-label">Sign up as Admin</label>
      </div>
      <button type="submit" className="sign-up-button">Sign Up</button>
    </form>
  );
}

export default SignUp;
