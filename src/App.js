import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow} from '@mui/material';

const baseUrl = "pokemons.json";

function App() {

  const [pokemonsData, setPokemonsData] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        setPokemonsData(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Ataque</TableCell>
              <TableCell>Defensa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemonsData.map(pokemon=>(
              <TableRow key={pokemon.id}>
                <TableCell>{pokemon.name}</TableCell>
                <TableCell>{pokemon.imgUrl}</TableCell>
                <TableCell>{pokemon.attack}</TableCell>
                <TableCell>{pokemon.defense}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>  
    </div>
  );
}

export default App;
