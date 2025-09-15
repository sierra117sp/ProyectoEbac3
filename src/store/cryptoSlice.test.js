import cryptoReducer, { addFavorite, removeFavorite } from './cryptoSlice';

describe('cryptoSlice reducers', () => {
  const initialState = {
    coins: [],
    coinDetail: null,
    favorites: [],
    loading: false,
    error: null,
  };

  it('agrega una criptomoneda a favoritos', () => {
    const state = cryptoReducer(initialState, addFavorite('bitcoin'));
    expect(state.favorites).toContain('bitcoin');
  });

  it('no agrega duplicados en favoritos', () => {
    const state = cryptoReducer({ ...initialState, favorites: ['bitcoin'] }, addFavorite('bitcoin'));
    expect(state.favorites).toEqual(['bitcoin']);
  });

  it('elimina una criptomoneda de favoritos', () => {
    const state = cryptoReducer({ ...initialState, favorites: ['bitcoin', 'ethereum'] }, removeFavorite('bitcoin'));
    expect(state.favorites).toEqual(['ethereum']);
  });
});
