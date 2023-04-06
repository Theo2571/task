import React from 'react';
import cl from '../../pages/PokemonListPage/PokemonList.module.scss';
import { TextField } from '@mui/material';

export const Find = ({ text, search, setSearch }) => {
  return (
    <div>
      <div className={cl.find}>
        <TextField
          sx={{ width: 300 }}
          id="outlined-basic"
          size="small"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label={text}
          variant="outlined"
        />
      </div>
    </div>
  );
};
