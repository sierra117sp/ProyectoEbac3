import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCoins, addFavorite, removeFavorite } from '../store/cryptoSlice';
import CryptoSearch from './CryptoSearch';
import CryptoFilters from './CryptoFilters';


const CryptoList = ({ disableFetch = false }) => {
  const dispatch = useDispatch();
  const { coins, favorites, loading, error } = useSelector(state => state.crypto);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('market_cap_rank');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!disableFetch) {
      dispatch(fetchCoins());
    }
  }, [dispatch, disableFetch]);

  let filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (filter === 'positive') {
    filteredCoins = filteredCoins.filter(coin => coin.price_change_percentage_24h > 0);
  } else if (filter === 'negative') {
    filteredCoins = filteredCoins.filter(coin => coin.price_change_percentage_24h < 0);
  }

  filteredCoins = [...filteredCoins].sort((a, b) => {
    if (sort === 'market_cap_rank') return a.market_cap_rank - b.market_cap_rank;
    if (sort === 'current_price') return b.current_price - a.current_price;
    if (sort === 'price_change_percentage_24h') return b.price_change_percentage_24h - a.price_change_percentage_24h;
    return 0;
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Criptomonedas Populares</h2>
  <CryptoSearch value={search} onChange={setSearch} />
  <CryptoFilters sort={sort} setSort={setSort} filter={filter} setFilter={setFilter} />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredCoins.map(coin => (
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
