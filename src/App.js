import React from 'react';
import { ROUTES_PATH } from './routes/contacts';
import { Route, Routes } from 'react-router-dom';
import { PokemonDetails } from './components/PokemonDetails/PokemonDetails';
import { PokemonList } from './pages/PokemonListPage/PokemonList';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={ROUTES_PATH.pokemons} element={<PokemonList />} />
        <Route path={ROUTES_PATH.pokemonId}>
          <Route path=":id" element={<PokemonDetails />} />
        </Route>
        <Route path={ROUTES_PATH.notFound} element={<PokemonList />} />
      </Routes>
    </div>
  );
};

export default App;
