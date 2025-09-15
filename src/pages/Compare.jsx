import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Compare = () => {
  const { coins } = useSelector(state => state.crypto);
  const [coinA, setCoinA] = useState('');
  const [coinB, setCoinB] = useState('');

  const coinAData = coins.find(c => c.id === coinA);
  const coinBData = coins.find(c => c.id === coinB);

  return (
    <div className="container">
      <h1>Comparador de Criptomonedas</h1>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div>
          <label>Moneda A:</label><br />
          <select value={coinA} onChange={e => setCoinA(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '180px' }}>
            <option value="">Selecciona</option>
            {coins.map(coin => (
              <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol.toUpperCase()})</option>
            ))}
          </select>
        </div>
        <div>
          <label>Moneda B:</label><br />
          <select value={coinB} onChange={e => setCoinB(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '180px' }}>
            <option value="">Selecciona</option>
            {coins.map(coin => (
              <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol.toUpperCase()})</option>
            ))}
          </select>
        </div>
      </div>
      {(coinAData && coinBData) && (
        <table style={{ width: '100%', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '1rem' }}></th>
              <th style={{ padding: '1rem' }}>{coinAData.name}</th>
              <th style={{ padding: '1rem' }}>{coinBData.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: '1rem' }}>Precio</td><td style={{ padding: '1rem' }}>${coinAData.current_price.toLocaleString()}</td><td style={{ padding: '1rem' }}>${coinBData.current_price.toLocaleString()}</td></tr>
            <tr><td style={{ padding: '1rem' }}>Ranking</td><td style={{ padding: '1rem' }}>#{coinAData.market_cap_rank}</td><td style={{ padding: '1rem' }}>#{coinBData.market_cap_rank}</td></tr>
            <tr><td style={{ padding: '1rem' }}>Cambio 24h (%)</td><td style={{ padding: '1rem' }}>{coinAData.price_change_percentage_24h?.toFixed(2)}%</td><td style={{ padding: '1rem' }}>{coinBData.price_change_percentage_24h?.toFixed(2)}%</td></tr>
            <tr><td style={{ padding: '1rem' }}>Volumen 24h</td><td style={{ padding: '1rem' }}>${coinAData.total_volume.toLocaleString()}</td><td style={{ padding: '1rem' }}>${coinBData.total_volume.toLocaleString()}</td></tr>
            <tr><td style={{ padding: '1rem' }}>En circulación</td><td style={{ padding: '1rem' }}>{coinAData.circulating_supply?.toLocaleString()} {coinAData.symbol.toUpperCase()}</td><td style={{ padding: '1rem' }}>{coinBData.circulating_supply?.toLocaleString()} {coinBData.symbol.toUpperCase()}</td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Compare;
