import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Box, Grid} from '@mui/material';
import {Add, Edit, Delete} from '@mui/icons-material';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import CustomForm from './components/CustomForm/CustomForm';
import CustomModal from './components/CustomModal/CustomModal';
import CustomSearch from './components/CustomSearch/CustomSearch';
import { getMarks } from './utils/getMarks';
import { isObjectEmpty } from './utils/isObjectEmpty';

const baseUrl = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon";
// comment line above and uncomment line below to load mock data
// const baseUrl = "pokemons.json";

function App() {

  // States of the application

  const [pokemonsData, setPokemonsData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState({});

 
  const [selectedPokemon, setSelectedPokemon] = useState({
    name: '',
    image: '',
    attack: 0,
    defense: 0,
    hp: 0,
    type: '',
    idAuthor: 1
  });

  // Loading data from API

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

  // Handlers and CRUD methods
  
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
          handleClickClear();
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
      handleClickClear(); 
      closeModalDelete();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // Render

  return (
    <div className="App">
      <h1>Listado de Pokemon</h1>
      <br/>
      <div>
        <Grid container>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                <CustomSearch customSize="small" customPlaceholder="Buscar" onChangeHandler={handleChangeSearch} customValue={searchQuery} customClearIcon={showClearIcon} onClearHandler={handleClickClear} />
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
              <TableCell><b>ID</b></TableCell>
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
                  <TableCell>{pokemon.id}</TableCell>
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
                  <TableCell>{filteredPokemon.id}</TableCell>
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
        <CustomForm title="Nuevo Pokemon" onChangeHandler={handleChange} submitCustomHandler={submitPostHandler}  closeCustomForm={closeForm} customMarks={getMarks()} />
      ) : (
        <br/>  
      )}
      </div>
      <div>
      {showEditForm ? (
        <CustomForm title="Actualizar Pokemon" onChangeHandler={handleChange} submitCustomHandler={submitPutHandler}  closeCustomForm={closeEditForm} customMarks={getMarks()} customSelectedElement={selectedPokemon} />
      ) : (
        <br/>  
      )}
      </div>
      <div>
        <CustomModal customMessage="Está seguro que desea eliminar el Pokemon " showModal={showModalDelete} closeModal={closeModalDelete} submitHandler={submitDeleteHandler} customSelectedElement={selectedPokemon} />
      </div>
    </div>
  );
}

export default App;
