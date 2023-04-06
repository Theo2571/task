import React, { useEffect, useState } from 'react';
import { TablePagination } from '@mui/material';
import cl from './PokemonList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemon } from '../../redux/Slice/UserSlice';
import { MultiActionAreaCard } from '../../components/Card/Card';
import { Find } from '../../components/Find/Find';
export const PokemonList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { pokemon, count, loading, error } = useSelector((store) => store.pokemon);
  const filterPokemon = pokemon.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(search.toLowerCase()) &&
      pokemon.types.some((type) => type.includes(searchType.toLowerCase()))
    );
  });
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getPokemon({ limit: rowsPerPage, offset: page * rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <div className={cl.wrapper}>
        <h3>Живой поиск</h3>
        <div className={cl.find}>
          <Find text={'Поиск по имени'} search={search} setSearch={setSearch} />
          <Find text={'Поиск по типу'} search={searchType} setSearch={setSearchType} />
        </div>
        <MultiActionAreaCard pokemons={filterPokemon} />
        <div className={cl.pagination}>
          <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};
