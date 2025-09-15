import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCoinDetail } from '../store/cryptoSlice';

const CryptoDetail = ({ disableFetch = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { coinDetail, loading, error } = useSelector(state => state.crypto);

  useEffect(() => {
    if (!disableFetch && id) {
      dispatch(fetchCoinDetail(id));
    }
  }, [dispatch, id, disableFetch]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!coinDetail) return <p>No hay datos.</p>;

  return (
    <div style={{ background: '#fff', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <h2>{coinDetail.name} ({coinDetail.symbol.toUpperCase()})</h2>
      <img src={coinDetail.image.large} alt={coinDetail.name} width={64} height={64} />
      <p>Precio actual: ${coinDetail.market_data.current_price.usd.toLocaleString()}</p>
      <p>Capitalización de mercado: ${coinDetail.market_data.market_cap.usd.toLocaleString()}</p>
      <p>Puntaje de comunidad: {coinDetail.community_score}</p>
      <div dangerouslySetInnerHTML={{ __html: coinDetail.description.es || coinDetail.description.en }} />
    </div>
  );
};

export default CryptoDetail;
