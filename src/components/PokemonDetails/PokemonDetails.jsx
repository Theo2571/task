import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonById } from '../../redux/Slice/UserSlice';
import cl from './PokemonDetails.module.scss';
import { Button } from '@mui/material';
export const PokemonDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pokemonData, loading, error } = useSelector((store) => store.pokemon);
  const handleClickBack = () => {
    navigate('/');
  };
  useEffect(() => {
    dispatch(getPokemonById(params.id));
  }, [dispatch, params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className={cl.details}>
      <h2>{pokemonData?.name}</h2>
      <img src={pokemonData?.sprites.front_default} alt={pokemonData?.name} />
      <p>Weight: {pokemonData?.weight}</p>
      <p>Height: {pokemonData?.height}</p>
      <p>Abilities:</p>
      <ul>
        {pokemonData?.abilities.map((ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
      <p>Stats:</p>
      <ul>
        {pokemonData?.stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
      <Button onClick={() => handleClickBack()}>Назад</Button>
    </div>
  );
};
