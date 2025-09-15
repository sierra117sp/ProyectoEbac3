import React from 'react';

const CryptoSearch = ({ value, onChange }) => (
  <div style={{ marginBottom: '2rem' }}>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Buscar criptomoneda por nombre o símbolo..."
      style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #ccc', width: '100%', maxWidth: '400px', fontSize: '1rem' }}
    />
  </div>
);

export default CryptoSearch;
