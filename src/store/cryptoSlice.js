import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCoins, getCoinDetail } from '../services/cryptoApi';

export const fetchCoins = createAsyncThunk('crypto/fetchCoins', async (page = 1) => {
  return await getCoins(page);
});

export const fetchCoinDetail = createAsyncThunk('crypto/fetchCoinDetail', async (id) => {
  return await getCoinDetail(id);
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    coins: [],
    coinDetail: null,
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCoinDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoinDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.coinDetail = action.payload;
      })
      .addCase(fetchCoinDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addFavorite, removeFavorite } = cryptoSlice.actions;
export default cryptoSlice.reducer;
