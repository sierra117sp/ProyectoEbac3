import React from 'react';

const AlertBanner = ({ message, type = 'info', onClose }) => {
  if (!message) return null;
  const colors = {
    info: '#007bff',
    success: '#28a745',
    error: '#dc3545',
    warning: '#ffc107',
  };
  return (
    <div style={{
      background: colors[type] || '#007bff',
      color: '#fff',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      position: 'relative',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      fontWeight: 'bold',
      textAlign: 'center',
    }}>
      {message}
      {onClose && (
        <button onClick={onClose} style={{ position: 'absolute', right: 12, top: 8, background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>&times;</button>
      )}
    </div>
  );
};

export default AlertBanner;
