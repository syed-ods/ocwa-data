'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { OntarioInput } from '@ongov/ontario-design-system-component-library-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Both fields are required');
      return;
    }
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        router.push('/');
      }
    } catch (err) {
      setError('Invalid credentials');
      console.error('Error logging in:', err);
    }
  };

  return (
    <section id="login-section">
      <h1>Welcome to the Next-CRUD app</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <OntarioInput
          caption="Username"
          elementId="login-username"
          type="text"
          value={username}
          customOnChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <OntarioInput
          caption="Password"
          type="password"
          value={password}
          customOnChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default Login;
