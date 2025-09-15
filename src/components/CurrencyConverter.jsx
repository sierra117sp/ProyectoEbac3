import React, { useState } from 'react';
import AlertBanner from './AlertBanner';

const CurrencyConverter = ({ price, symbol }) => {
  const [usd, setUsd] = useState('');
  const [crypto, setCrypto] = useState('');
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('info');

  const handleUsdChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setUsd(value);
    if (!price || isNaN(price)) {
      setMessage('Error: Precio de la moneda no disponible.');
      setAlertType('error');
      setCrypto('');
      setTimeout(() => {
        alert('Error: Precio de la moneda no disponible.');
      }, 100);
      return;
    }
    setCrypto(value && price ? (parseFloat(value) / price).toFixed(6) : '');
    if (value && price) {
      setMessage(`Conversión exitosa: ${value} USD = ${(parseFloat(value) / price).toFixed(6)} ${symbol.toUpperCase()}`);
      setAlertType('success');
      setTimeout(() => {
        alert(`Conversión exitosa: ${value} USD = ${(parseFloat(value) / price).toFixed(6)} ${symbol.toUpperCase()}`);
      }, 100);
    } else {
      setMessage('');
    }
  };

  const handleCryptoChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setCrypto(value);
    if (!price || isNaN(price)) {
      setMessage('Error: Precio de la moneda no disponible.');
      setAlertType('error');
      setUsd('');
      setTimeout(() => {
        alert('Error: Precio de la moneda no disponible.');
      }, 100);
      return;
    }
    setUsd(value && price ? (parseFloat(value) * price).toFixed(2) : '');
    if (value && price) {
      setMessage(`Conversión exitosa: ${value} ${symbol.toUpperCase()} = ${(parseFloat(value) * price).toFixed(2)} USD`);
      setAlertType('success');
      setTimeout(() => {
        alert(`Conversión exitosa: ${value} ${symbol.toUpperCase()} = ${(parseFloat(value) * price).toFixed(2)} USD`);
      }, 100);
    } else {
      setMessage('');
    }
  };

  return (
    <div style={{ marginTop: '2rem', marginBottom: '2rem', background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
      <h3>Conversor USD → {symbol.toUpperCase()}</h3>
      <AlertBanner message={message} type={alertType} onClose={() => setMessage('')} />
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div>
          <label htmlFor="usd">USD:</label><br />
          <input
            id="usd"
            type="number"
            value={usd}
            onChange={handleUsdChange}
            placeholder="Monto en USD"
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '120px' }}
          />
        </div>
        <span style={{ fontWeight: 'bold' }}>=</span>
        <div>
          <label htmlFor="crypto">{symbol.toUpperCase()}:</label><br />
          <input
            id="crypto"
            type="number"
            value={crypto}
            onChange={handleCryptoChange}
            placeholder={`Monto en ${symbol.toUpperCase()}`}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '120px' }}
          />
        </div>
      </div>
      <p style={{ marginTop: '0.5rem', fontSize: '0.95em', color: '#555' }}>
        1 {symbol.toUpperCase()} = ${price?.toLocaleString()} USD
      </p>
    </div>
  );
};

export default CurrencyConverter;
