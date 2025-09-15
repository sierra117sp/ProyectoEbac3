import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import cryptoReducer from '../../store/cryptoSlice';
import CryptoDetail from '../CryptoDetail';

const mockStore = configureStore({
  reducer: { crypto: cryptoReducer },
  preloadedState: {
    crypto: {
      coinDetail: {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'btc',
        image: { large: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png' },
        market_data: {
          current_price: { usd: 50000 },
          market_cap: { usd: 1000000000 },
        },
        community_score: 90,
        description: { es: 'Criptomoneda líder.' },
      },
      coins: [],
      favorites: [],
  loading: false,
      error: null,
    },
  },
});

describe('CryptoDetail', () => {
  it('muestra los datos de la criptomoneda', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={["/detail/bitcoin"]}>
          <Routes>
            <Route path="/detail/:id" element={<CryptoDetail disableFetch={true} />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
    expect(screen.getByText(/Precio actual/i)).toBeInTheDocument();
    expect(screen.getByText(/Capitalización de mercado/i)).toBeInTheDocument();
    expect(screen.getByText(/Criptomoneda líder/i)).toBeInTheDocument();
  });
});
