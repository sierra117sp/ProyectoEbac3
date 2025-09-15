import React from 'react';

const CryptoFilters = ({ sort, setSort, filter, setFilter }) => (
  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
    <div>
      <label htmlFor="sort">Ordenar por:</label><br />
      <select id="sort" value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
        <option value="market_cap_rank">Ranking</option>
        <option value="current_price">Precio</option>
        <option value="price_change_percentage_24h">Cambio 24h (%)</option>
      </select>
    </div>
    <div>
      <label htmlFor="filter">Filtrar:</label><br />
      <select id="filter" value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
        <option value="all">Todas</option>
        <option value="positive">Solo subida</option>
        <option value="negative">Solo bajada</option>
      </select>
    </div>
  </div>
);

export default CryptoFilters;
