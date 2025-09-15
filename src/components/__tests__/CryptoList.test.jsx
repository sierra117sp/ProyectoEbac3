import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import cryptoReducer from '../../store/cryptoSlice';
import CryptoList from '../CryptoList';

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

describe('CryptoList', () => {
  it('muestra la lista de criptomonedas', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <CryptoList disableFetch={true} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
    expect(screen.getByText(/Ethereum/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(2);
  });
});
