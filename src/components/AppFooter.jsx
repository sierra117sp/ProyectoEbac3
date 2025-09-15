import React from 'react';

const AppFooter = () => (
  <footer style={{
    width: '100%',
    background: '#222',
    color: '#fff',
    textAlign: 'center',
    padding: '1rem 0',
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: 100,
    fontSize: '1rem',
    boxShadow: '0 -2px 8px rgba(0,0,0,0.08)'
  }}>
    Esta app fue creada por <strong>Jose Emmanuel Alvarado</strong> - <strong>Osiris-Development</strong> &nbsp;
    <a href="https://github.com/sierra117sp" target="_blank" rel="noopener noreferrer" style={{ color: '#ffb700', textDecoration: 'underline' }}>
      https://github.com/sierra117sp
    </a>
  </footer>
);

export default AppFooter;
