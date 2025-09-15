import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCoins, addFavorite, removeFavorite } from '../store/cryptoSlice';


const CryptoList = ({ disableFetch = false }) => {
  const dispatch = useDispatch();
  const { coins, favorites, loading, error } = useSelector(state => state.crypto);

  useEffect(() => {
    if (!disableFetch) {
      dispatch(fetchCoins());
    }
  }, [dispatch, disableFetch]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Criptomonedas Populares</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {coins.map(coin => (
          <li key={coin.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', background: '#fff', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <img src={coin.image} alt={coin.name} width={32} height={32} style={{ marginRight: '1rem' }} />
            <div style={{ flex: 1 }}>
              <Link to={`/detail/${coin.id}`} style={{ textDecoration: 'none', color: '#222' }}>
                <strong>{coin.name} ({coin.symbol.toUpperCase()})</strong>
              </Link><br />
              Precio: ${coin.current_price.toLocaleString()}
            </div>
            <button
              onClick={() => favorites.includes(coin.id) ? dispatch(removeFavorite(coin.id)) : dispatch(addFavorite(coin.id))}
              style={{ marginLeft: '1rem', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', background: favorites.includes(coin.id) ? '#ffb700' : '#eee', cursor: 'pointer' }}
            >
              {favorites.includes(coin.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoList;
