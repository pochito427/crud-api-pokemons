import React from 'react';
import {Slider, Box, Grid} from '@mui/material';
import {Close, Save} from '@mui/icons-material';
import Button from '@mui/joy/Button';

function CustomForm({
    title = "", 
    onChangeHandler = () => {}, 
    submitCustomHandler = () => {}, 
    closeCustomForm = () => {}, 
    customMarks = [], 
    customSelectedElement = {}, 
    ...props}){

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Box>
                <h1>{title}</h1>
              </Box>
            </Grid>
            <br/>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <label htmlFor="name">Nombre:</label>
                <input id="name" name="name" onChange={onChangeHandler} value={customSelectedElement && customSelectedElement.name}/>
                
              </Box>
            </Grid>
            <br/>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <label htmlFor="attack">Ataque:</label>
                <Slider id="attack" name="attack" aria-label="Ataque" defaultValue={50} min={0} max={100} valueLabelDisplay="auto" marks={customMarks} onChange={onChangeHandler} value={customSelectedElement && customSelectedElement.attack}/>
                
              </Box>  
            </Grid>
            <br/>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <label htmlFor="image">Imagen:</label>
                <input id="image" name="image" aria-describedby="my-helper-text" placeholder="url" onChange={onChangeHandler} value={customSelectedElement && customSelectedElement.image}/>
                
              </Box>
            </Grid>
            <br/>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <label htmlFor="defense">Defensa:</label>
                <Slider id="defense" name="defense" aria-label="Defensa" defaultValue={50} min={0} max={100} valueLabelDisplay="auto" marks={customMarks} onChange={onChangeHandler} value={customSelectedElement && customSelectedElement.defense}/>
                
              </Box>  
            </Grid>
            <br/>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <Button onClick={submitCustomHandler} startDecorator={<Save/>} sx={(theme) => ({ "background-color": "#6657f7", "border-radius": 0, "color": "#ffffff" })}>Guardar</Button>
                
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                
                <Button onClick={closeCustomForm} startDecorator={<Close/>} sx={(theme) => ({ "background-color": "#6657f7", "border-radius": 0, "color": "#ffffff" })}>Cancelar</Button>
                
              </Box>
            </Grid>
        </Grid>
    );

}

export default CustomForm;