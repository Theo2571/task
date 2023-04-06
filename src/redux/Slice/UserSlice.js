import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL = 'https://pokeapi.co/api/v2/';
const initialState = {
  pokemon: [],
  pokemonData: null,
  loading: false,
  error: null,
  count: 0,
};

export const getPokemon = createAsyncThunk('pokemon/getPokemon', async ({ limit, offset }) => {
  const res = await axios.get(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}`);
  const items = await Promise.all(
    res.data.results.map(async (pokemon) => {
      const pokemonResponse = await axios.get(pokemon.url);
      return {
        id: pokemonResponse.data.id,
        name: pokemonResponse.data.name,
        avatar: pokemonResponse.data.sprites.front_default,
        types: pokemonResponse.data.types.map((type) => type.type.name),
        stats: pokemonResponse.data.stats[0].base_stat,
      };
    }),
  );
  return { items, count: res.data.count };
});
export const getPokemonById = createAsyncThunk('pokemon/getPokemonById', async (id) => {
  const res = await axios.get(`${BASE_URL}pokemon/${id}`);
  return res.data;
});

export const userSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPokemon.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPokemon.fulfilled, (state, action) => {
        state.pokemon = action.payload.items;
        state.count = action.payload.count;
        state.loading = false;
        state.error = null;
      })
      .addCase(getPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getPokemonById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPokemonById.fulfilled, (state, action) => {
        state.pokemonData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getPokemonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const userSliceReducer = userSlice.reducer;
