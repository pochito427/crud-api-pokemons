import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow} from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';
import Avatar from '@mui/joy/Avatar';

const baseUrl = "pokemons.json";

function App() {

  const [pokemonsData, setPokemonsData] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        setPokemonsData(response.data);
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
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemonsData.map(pokemon=>(
              <TableRow key={pokemon.id}>
                <TableCell>{pokemon.name}</TableCell>
                <TableCell><Avatar alt={pokemon.name} src={pokemon.imgUrl}/></TableCell>
                <TableCell>{pokemon.attack}</TableCell>
                <TableCell>{pokemon.defense}</TableCell>
                <TableCell>
                  <Edit/>
                  &nbsp;&nbsp;&nbsp;
                  <Delete/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>  
    </div>
  );
}

export default App;
