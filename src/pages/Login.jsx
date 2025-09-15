import React, { useState } from 'react';
import AlertBanner from '../components/AlertBanner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('info');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setMessage('¡Login exitoso!');
      setAlertType('success');
      localStorage.setItem('loggedUser', JSON.stringify(user));
      setTimeout(() => {
        alert('¡Bienvenido! Login exitoso.');
      }, 100);
    } else {
      setMessage('Credenciales incorrectas.');
      setAlertType('error');
      setTimeout(() => {
        alert('Error: Credenciales incorrectas.');
      }, 100);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400 }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: '1rem' }} />
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: '1rem' }} />
        <button type="submit" style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', background: '#007bff', color: '#fff', border: 'none', fontWeight: 'bold' }}>Ingresar</button>
      </form>
  <AlertBanner message={message} type={alertType} onClose={() => setMessage('')} />
    </div>
  );
};

export default Login;
