import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function LoginForm() {
  const { loginUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>Username:<input type="text" value={username} onChange={e => setUsername(e.target.value)} required /></label>
      <label>Password:<input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;