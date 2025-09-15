import React from 'react';

const ThemeToggle = ({ darkMode, setDarkMode }) => (
  <button
    onClick={() => setDarkMode(!darkMode)}
    style={{
      background: darkMode ? '#222' : '#eee',
      color: darkMode ? '#fff' : '#222',
      border: 'none',
      borderRadius: '20px',
      padding: '0.5rem 1.2rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      marginLeft: '1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}
    aria-label="Cambiar tema"
  >
    {darkMode ? '🌙 Modo claro' : '🌞 Modo oscuro'}
  </button>
);

export default ThemeToggle;
