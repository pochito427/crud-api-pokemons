import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, FormControl, FormGroup, Slider} from '@mui/material';
import {Add, Close, Edit, Delete, Save} from '@mui/icons-material';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';

const baseUrl = "pokemons.json";

function App() {

  const [pokemonsData, setPokemonsData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 100,
      label: '100',
    },
  ];

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

  const openForm = () => {
    setShowForm(true);
  }

  const closeForm = () => {
    setShowForm(false);
  }

  return (
    <div className="App">
      <h1>Listado de Pokemon</h1>
      <br/>
      <Button onClick={openForm} startDecorator={<Add />} sx={(theme) => ({ "background-color": "#6657f7", "border-radius": 0, "color": "#ffffff" })}>Nuevo</Button>
      <br/>
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
      <br/>
      {showForm ? (
        <FormControl>
          <h1>Nuevo Pokemon</h1>
          <br/>
          <FormGroup>
            <label htmlFor="name">Nombre:</label>
            <input id="name"/>
            <br/>
            <label htmlFor="image">Imagen:</label>
            <input id="image" aria-describedby="my-helper-text" placeholder="url"/>
          </FormGroup>
          <FormGroup>
            <label htmlFor="attack">Ataque:</label>
            <Slider id="attack" aria-label="Ataque" defaultValue={50} min={0} max={100} valueLabelDisplay="auto" marks={marks}/>
            <br/>
            <label htmlFor="defense">Defensa:</label>
            <Slider id="defense" aria-label="Defensa" defaultValue={50} min={0} max={100} valueLabelDisplay="auto" marks={marks}/>
          </FormGroup>
          <FormGroup>
            <Button startDecorator={<Save/>} sx={(theme) => ({ "background-color": "#6657f7", "border-radius": 0, "color": "#ffffff" })}>Guardar</Button>
            <Button onClick={closeForm} startDecorator={<Close/>} sx={(theme) => ({ "background-color": "#6657f7", "border-radius": 0, "color": "#ffffff" })}>Cerrar</Button>
          </FormGroup>
        </FormControl>
      ) : (
        <br/>  
      )}
    </div>
  );
}

export default App;
