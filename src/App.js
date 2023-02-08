import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Slider, Box, Grid} from '@mui/material';
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

  
  const [selectedPokemon, setSelectedPokemon] = useState({
    name: '',
    image: '',
    attack: 0,
    defense: 0
  });

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

  const handleChange = e => {
    const {name, value} = e.target;
    setSelectedPokemon(prevState => ({
      ...prevState,
      [name]: value
    }))
    //console.log(selectedPokemon);
  }

  const submitHandler = () => {
    const copyPokemonsData = [...pokemonsData];
    let newNextId = copyPokemonsData[copyPokemonsData.length - 1].id + 1;
    if (selectedPokemon.name !== "" && selectedPokemon.image !== "") {
      if (
        !pokemonsData.some(
          (pokemon) => pokemon.name.toLowerCase() === selectedPokemon.name.toLowerCase()
        )
      ) {
        setPokemonsData([...pokemonsData, { id: newNextId, name: selectedPokemon.name, imgUrl: selectedPokemon.image, attack: selectedPokemon.attack, defense: selectedPokemon.defense }]);
      } else {
        alert("Este nombre está en el listado. Por favor, ingrese otro nombre diferente.");
      }
    } else {
      alert("Usted no debe ingresar nombres o imágenes vacíos.");
    }
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
                  <Edit sx={(theme) => ({ "color": "#6657f7" })}/>
                  &nbsp;&nbsp;&nbsp;
                  <Delete sx={(theme) => ({ "color": "#6657f7" })}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br/>
      <div>
      {showForm ? (
        <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Box>
                <h1>Nuevo Pokemon</h1>
              </Box>
            </Grid>
            <br/>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <label htmlFor="name">Nombre:</label>
                <input id="name" name="name" onChange={handleChange}/>
                
              </Box>
            </Grid>
            <br/>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <label htmlFor="attack">Ataque:</label>
                <Slider id="attack" name="attack" aria-label="Ataque" defaultValue={50} min={0} max={100} valueLabelDisplay="auto" marks={marks} onChange={handleChange}/>
                
              </Box>  
            </Grid>
            <br/>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <label htmlFor="image">Imagen:</label>
                <input id="image" name="image" aria-describedby="my-helper-text" placeholder="url" onChange={handleChange}/>
                
              </Box>
            </Grid>
            <br/>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <label htmlFor="defense">Defensa:</label>
                <Slider id="defense" name="defense" aria-label="Defensa" defaultValue={50} min={0} max={100} valueLabelDisplay="auto" marks={marks} onChange={handleChange}/>
                
              </Box>  
            </Grid>
            <br/>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <Button onClick={submitHandler} startDecorator={<Save/>} sx={(theme) => ({ "background-color": "#6657f7", "border-radius": 0, "color": "#ffffff" })}>Guardar</Button>
                
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <Button onClick={closeForm} startDecorator={<Close/>} sx={(theme) => ({ "background-color": "#6657f7", "border-radius": 0, "color": "#ffffff" })}>Cancelar</Button>
                
              </Box>
            </Grid>
        </Grid>
      ) : (
        <br/>  
      )}
      </div>
      
    </div>
  );
}

export default App;
