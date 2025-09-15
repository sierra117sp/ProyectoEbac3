import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../store/cryptoSlice';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
  const dispatch = useDispatch();
  const { coins, favorites } = useSelector(state => state.crypto);
  const favoriteCoins = coins.filter(coin => favorites.includes(coin.id));

  if (favoriteCoins.length === 0) return <p>No tienes criptomonedas favoritas.</p>;

  return (
    <div>
      <h2>Mis Criptomonedas Favoritas</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {favoriteCoins.map(coin => (
          <li key={coin.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', background: '#fff', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <img src={coin.image} alt={coin.name} width={32} height={32} style={{ marginRight: '1rem' }} />
            <div style={{ flex: 1 }}>
              <Link to={`/detail/${coin.id}`} style={{ textDecoration: 'none', color: '#222' }}>
                <strong>{coin.name} ({coin.symbol.toUpperCase()})</strong>
              </Link><br />
              Precio: ${coin.current_price.toLocaleString()}
            </div>
            <button
              onClick={() => dispatch(removeFavorite(coin.id))}
              style={{ marginLeft: '1rem', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', background: '#ffb700', cursor: 'pointer' }}
            >
              Quitar de favoritos
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
