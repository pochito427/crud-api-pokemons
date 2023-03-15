import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Slider, Box, Grid, Modal, TextField, InputAdornment} from '@mui/material';
import {Add, Close, Edit, Delete, Save, Search, Clear} from '@mui/icons-material';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';

const baseUrl = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon";
// const baseUrl = "pokemons.json";

function App() {

  const [pokemonsData, setPokemonsData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState({});

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
    defense: 0,
    hp: 0,
    type: '',
    idAuthor: 1
  });

  const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0 && objectName.constructor === Object;
  }

  useEffect(() => {
    axios
      .get(baseUrl,{
        params: {
          idAuthor: 1
        }
      })
      .then((response) => {
        setPokemonsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pokemonsData]);

  
  const openForm = () => {
    setShowForm(true);
  }

  const closeForm = () => {
    setShowForm(false);
  }

  const openEditForm = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowEditForm(true);
  }

  const closeEditForm = () => {
    setShowEditForm(false);
  }

  const openModalDelete = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModalDelete(true);
  }

  const closeModalDelete = () => {
    setShowModalDelete(false);
  }

  const handleChange = e => {
    const {name, value} = e.target;
    setSelectedPokemon(prevState => ({
      ...prevState,
      [name]: value
    }))
    // console.log(selectedPokemon);
  }

  const handleChangeSearch = e => {
    setShowClearIcon(e.target.value === "" ? "none" : "flex");
    setSearchQuery(e.target.value);
    if(searchQuery !== ""){
      axios
      .get(baseUrl+'/'+searchQuery)
      .then((response) => {
        setFilteredPokemon(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  const handleClickClear = () => {
    setSearchQuery("");
    setFilteredPokemon({});
  };

  const submitPostHandler = async() => {
    const copyPokemonsData = [...pokemonsData];
    let newNextId = copyPokemonsData[copyPokemonsData.length - 1].id + 1;
    if (selectedPokemon.name !== "" && selectedPokemon.image !== "") {
      if (
        !pokemonsData.some(
          (pokemon) => pokemon.name.toLowerCase() === selectedPokemon.name.toLowerCase()
        )
      ) {
        await axios.post(baseUrl, { id: newNextId, name: selectedPokemon.name, image: selectedPokemon.image, attack: selectedPokemon.attack, defense: selectedPokemon.defense, hp: selectedPokemon.hp, type: selectedPokemon.type, idAuthor: selectedPokemon.idAuthor })
        .then(response=>{
          setPokemonsData([...pokemonsData, response.data]);
          closeForm();
        })
        .catch((error) => {
          console.log(error);
        });
        // setPokemonsData([...pokemonsData, { id: newNextId, name: selectedPokemon.name, image: selectedPokemon.image, attack: selectedPokemon.attack, defense: selectedPokemon.defense }]);
      } else {
        alert("Este nombre está en el listado. Por favor, ingrese otro nombre diferente.");
      }
    } else {
      alert("Usted no debe ingresar nombres o imágenes vacíos.");
    }
  }

  const submitPutHandler = async() => {
    const copyPokemonsData = [...pokemonsData];
    if (selectedPokemon.name !== "" && selectedPokemon.image !== "") {
      if (
        !pokemonsData.some(
          (pokemon) => pokemon.name.toLowerCase() === selectedPokemon.name.toLowerCase()
        )
      ) {
        await axios.put(baseUrl+'/'+selectedPokemon.id, selectedPokemon)
        .then(response=>{
          copyPokemonsData.map(pokemon => {
            if(pokemon.id === selectedPokemon.id){
              pokemon.name = selectedPokemon.name;
              pokemon.image = selectedPokemon.image;
              pokemon.attack = selectedPokemon.attack;
              pokemon.defense = selectedPokemon.defense;
              pokemon.hp = selectedPokemon.hp;
              pokemon.type = selectedPokemon.type;
              pokemon.idAuthor = selectedPokemon.idAuthor
            }
          })
          setPokemonsData(copyPokemonsData);
          closeEditForm();
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        alert("Este nombre está en el listado. Por favor, ingrese otro nombre diferente.");
      }
    } else {
      alert("Usted no debe ingresar nombres o imágenes vacíos.");
    }
  }

  const submitDeleteHandler = async() => {
    await axios.delete(baseUrl+'/'+selectedPokemon.id)
    .then(response => {
      setPokemonsData(pokemonsData.filter(pokemon=>pokemon.id!==selectedPokemon.id));
      closeModalDelete();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="App">
      <h1>Listado de Pokemon</h1>
      <br/>
      <div>
        <Grid container>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Buscar"
                  onChange={handleChangeSearch}
                  value={searchQuery}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        style={{ display: showClearIcon }}
                        onClick={handleClickClear}
                      >
                        <Clear />
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}><Box>&nbsp;&nbsp;&nbsp;</Box></Grid>
            <Grid item xs={12} sm={6} md={6}><Box>&nbsp;&nbsp;&nbsp;</Box></Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                <Button onClick={openForm} startDecorator={<Add />} sx={(theme) => ({ "background-color": "#6657f7", "border-radius": 0, "color": "#ffffff" })}>Nuevo</Button>
              </Box>
            </Grid>
        </Grid>
      </div>
      <br/>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Nombre</b></TableCell>
              <TableCell><b>Imagen</b></TableCell> 
              <TableCell><b>Ataque</b></TableCell>
              <TableCell><b>Defensa</b></TableCell>
              <TableCell><b>Acciones</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isObjectEmpty(filteredPokemon) ? (
              pokemonsData.map(pokemon=>(
                <TableRow key={pokemon.id}>
                  <TableCell>{pokemon.name}</TableCell>
                  <TableCell><Avatar alt={pokemon.name} src={pokemon.image}/></TableCell>
                  <TableCell>{pokemon.attack}</TableCell>
                  <TableCell>{pokemon.defense}</TableCell>
                  <TableCell>
                    <Edit sx={(theme) => ({ "color": "#6657f7" })} onClick={() => openEditForm(pokemon)}/>
                    &nbsp;&nbsp;&nbsp;
                    <Delete sx={(theme) => ({ "color": "#6657f7" })} onClick={() => openModalDelete(pokemon)}/>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key={filteredPokemon.id}>
                  <TableCell>{filteredPokemon.name}</TableCell>
                  <TableCell><Avatar alt={filteredPokemon.name} src={filteredPokemon.image}/></TableCell>
                  <TableCell>{filteredPokemon.attack}</TableCell>
                  <TableCell>{filteredPokemon.defense}</TableCell>
                  <TableCell>
                    <Edit sx={(theme) => ({ "color": "#6657f7" })} onClick={() => openEditForm(filteredPokemon)}/>
                    &nbsp;&nbsp;&nbsp;
                    <Delete sx={(theme) => ({ "color": "#6657f7" })} onClick={() => openModalDelete(filteredPokemon)}/>
                  </TableCell>
              </TableRow>
            )}
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
                <Slider id="attack" name="attack" aria-label="Ataque" defaultValue={50} min={0} max={100} valueLabelDisplay="auto" marks={marks} onChange={handleChange} sx={(theme) => ({ "color": "#6657f7" })}/>
                
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
                <Slider id="defense" name="defense" aria-label="Defensa" defaultValue={50} min={0} max={100} valueLabelDisplay="auto" marks={marks} onChange={handleChange} sx={(theme) => ({ "color": "#6657f7" })}/>
                
              </Box>  
            </Grid>
            <br/>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <Button onClick={submitPostHandler} startDecorator={<Save/>} sx={(theme) => ({ "background-color": "#6657f7", "border-radius": 0, "color": "#ffffff" })}>Guardar</Button>
                
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
      <div>
      {showEditForm ? (
        <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Box>
                <h1>Actualizar Pokemon</h1>
              </Box>
            </Grid>
            <br/>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <label htmlFor="name">Nombre:</label>
                <input id="name" name="name" onChange={handleChange} value={selectedPokemon && selectedPokemon.name}/>
                
              </Box>
            </Grid>
            <br/>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <label htmlFor="attack">Ataque:</label>
                <Slider id="attack" name="attack" aria-label="Ataque" defaultValue={50} min={0} max={100} valueLabelDisplay="auto" marks={marks} onChange={handleChange} value={selectedPokemon && selectedPokemon.attack}/>
                
              </Box>  
            </Grid>
            <br/>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <label htmlFor="image">Imagen:</label>
                <input id="image" name="image" aria-describedby="my-helper-text" placeholder="url" onChange={handleChange} value={selectedPokemon && selectedPokemon.image}/>
                
              </Box>
            </Grid>
            <br/>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <label htmlFor="defense">Defensa:</label>
                <Slider id="defense" name="defense" aria-label="Defensa" defaultValue={50} min={0} max={100} valueLabelDisplay="auto" marks={marks} onChange={handleChange} value={selectedPokemon && selectedPokemon.defense}/>
                
              </Box>  
            </Grid>
            <br/>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <Button onClick={submitPutHandler} startDecorator={<Save/>} sx={(theme) => ({ "background-color": "#6657f7", "border-radius": 0, "color": "#ffffff" })}>Guardar</Button>
                
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <Button onClick={closeEditForm} startDecorator={<Close/>} sx={(theme) => ({ "background-color": "#6657f7", "border-radius": 0, "color": "#ffffff" })}>Cancelar</Button>
                
              </Box>
            </Grid>
        </Grid>
      ) : (
        <br/>  
      )}
      </div>
      <div>
        <Modal open={showModalDelete} onClose={() => closeModalDelete()}>
          <Box sx={styleModal}>
            <div>
              <p>¿Está seguro que desea eliminar el Pokemon <b>{selectedPokemon && selectedPokemon.name}</b>?</p>
            </div>
            <div>
              <Button color="secondary" onClick={() => submitDeleteHandler()}>Sí</Button>
              <br/>
              <Button onClick={() => closeModalDelete()}>No</Button>
            </div>
          </Box>  
        </Modal>
      </div>
    </div>
  );
}

export default App;
