"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { username, password });
      router.push('/login');
    } catch (err) {
      setError('Error registering user');
      console.error('Error registering user:', err);
    }
  };

  return (
    <section>
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </section>
  );
};

export default Register;