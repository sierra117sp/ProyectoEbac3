import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCoinDetail } from '../store/cryptoSlice';
import { fetchCoinMarketChart } from '../store/cryptoSlice';
import PriceChart from './PriceChart';
import CurrencyConverter from './CurrencyConverter';
import CryptoNews from './CryptoNews';

const CryptoDetail = ({ disableFetch = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { coinDetail, loading, error } = useSelector(state => state.crypto);

  useEffect(() => {
    if (!disableFetch && id) {
      dispatch(fetchCoinDetail(id));
  dispatch(fetchCoinMarketChart({ id, days: 30 }));
    }
  }, [dispatch, id, disableFetch]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!coinDetail) return <p>No hay datos.</p>;

  return (
    <div style={{ background: '#fff', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <h2>{coinDetail.name} ({coinDetail.symbol.toUpperCase()})</h2>
      <img src={coinDetail.image.large} alt={coinDetail.name} width={64} height={64} />
  <p><strong>Precio actual:</strong> ${coinDetail.market_data.current_price.usd.toLocaleString()}</p>
  <CurrencyConverter price={coinDetail.market_data.current_price.usd} symbol={coinDetail.symbol} />
      <p><strong>Capitalización de mercado:</strong> ${coinDetail.market_data.market_cap.usd.toLocaleString()}</p>
      <p><strong>Puntaje de comunidad:</strong> {coinDetail.community_score}</p>
      <p><strong>Ranking de mercado:</strong> #{coinDetail.market_cap_rank}</p>
      <p><strong>Volumen 24h:</strong> ${coinDetail.market_data.total_volume.usd.toLocaleString()}</p>
      <p><strong>Máximo histórico:</strong> ${coinDetail.market_data.ath.usd.toLocaleString()} ({new Date(coinDetail.market_data.ath_date.usd).toLocaleDateString()})</p>
      <p><strong>Mínimo histórico:</strong> ${coinDetail.market_data.atl.usd.toLocaleString()} ({new Date(coinDetail.market_data.atl_date.usd).toLocaleDateString()})</p>
      <p><strong>Porcentaje de cambio 24h:</strong> {coinDetail.market_data.price_change_percentage_24h?.toFixed(2)}%</p>
      <p><strong>En circulación:</strong> {coinDetail.market_data.circulating_supply?.toLocaleString()} {coinDetail.symbol.toUpperCase()}</p>
      <p><strong>Sitio oficial:</strong> <a href={coinDetail.links.homepage[0]} target="_blank" rel="noopener noreferrer">{coinDetail.links.homepage[0]}</a></p>
      <div style={{ marginTop: '1.5rem' }}>
        <strong>Descripción:</strong>
        <div dangerouslySetInnerHTML={{ __html: coinDetail.description.es || coinDetail.description.en }} />
      </div>
  <PriceChart prices={coinChart} />
  <CryptoNews coinName={coinDetail.name} />
    </div>
  );
};

export default CryptoDetail;
