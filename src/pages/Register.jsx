import React, { useState } from 'react';
import AlertBanner from '../components/AlertBanner';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('info');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      setMessage('El usuario ya existe.');
      setAlertType('error');
      setTimeout(() => {
        alert('Error: El usuario ya existe.');
      }, 100);
      return;
    }
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    setMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
    setAlertType('success');
    setEmail('');
    setPassword('');
    setTimeout(() => {
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    }, 100);
  };

  return (
    <div className="container" style={{ maxWidth: 400 }}>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: '1rem' }} />
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: '1rem' }} />
        <button type="submit" style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', background: '#28a745', color: '#fff', border: 'none', fontWeight: 'bold' }}>Registrarse</button>
      </form>
  <AlertBanner message={message} type={alertType} onClose={() => setMessage('')} />
    </div>
  );
};

export default Register;
