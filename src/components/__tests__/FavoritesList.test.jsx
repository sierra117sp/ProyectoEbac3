import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import cryptoReducer, { removeFavorite } from '../../store/cryptoSlice';
import FavoritesList from '../FavoritesList';

const mockStore = configureStore({
  reducer: { crypto: cryptoReducer },
  preloadedState: {
    crypto: {
      coins: [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc', image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', current_price: 50000 },
        { id: 'ethereum', name: 'Ethereum', symbol: 'eth', image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', current_price: 4000 },
      ],
      favorites: ['bitcoin'],
      loading: false,
      error: null,
      coinDetail: null,
    },
  },
});

describe('FavoritesList', () => {
  it('muestra las criptomonedas favoritas', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <FavoritesList />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
    expect(screen.queryByText(/Ethereum/i)).not.toBeInTheDocument();
  });

  it('muestra mensaje si no hay favoritos', () => {
    const emptyStore = configureStore({
      reducer: { crypto: cryptoReducer },
      preloadedState: {
        crypto: {
          coins: [],
          favorites: [],
          loading: false,
          error: null,
          coinDetail: null,
        },
      },
    });
    render(
      <Provider store={emptyStore}>
        <BrowserRouter>
          <FavoritesList />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/No tienes criptomonedas favoritas/i)).toBeInTheDocument();
  });
});
