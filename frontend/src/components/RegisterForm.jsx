import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function RegisterForm() {
  const { registerUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(username, email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <label>Username:<input type="text" value={username} onChange={e => setUsername(e.target.value)} required /></label>
      <label>Email:<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
      <label>Password:<input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;