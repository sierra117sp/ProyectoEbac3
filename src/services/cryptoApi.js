import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getCoins = async (page = 1, perPage = 20) => {
  const response = await axios.get(`${BASE_URL}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage,
      page,
      sparkline: false,
    },
  });
  return response.data;
};

export const getCoinDetail = async (id) => {
  const response = await axios.get(`${BASE_URL}/coins/${id}`);
  return response.data;
};
