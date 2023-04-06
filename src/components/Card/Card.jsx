import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import cl from './Card.module.scss';
import { useNavigate } from 'react-router-dom';

export const MultiActionAreaCard = ({ pokemons }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`pokemon/${id}`);
  };
  return (
    <div className={cl.container}>
      {pokemons.map((item) => {
        return (
          <Card className={cl.card} key={item.id}>
            <CardMedia component="img" height="300" image={item.avatar} alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Способности:
              </Typography>
              <div className={cl.type}>
                {item.types.map((type, idx) => {
                  return (
                    <Typography key={idx} variant="body1" color="text.secondary">
                      {type}
                    </Typography>
                  );
                })}
              </div>
            </CardContent>
            <CardActions>
              <Button onClick={() => handleClick(item.id)} size="small" color="primary">
                Подробнее
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};
