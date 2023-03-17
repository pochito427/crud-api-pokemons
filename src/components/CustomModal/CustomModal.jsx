import React from 'react';
import {Modal, Box} from '@mui/material';
import Button from '@mui/joy/Button';

function CustomModal({
    customMessage = "",
    showModal = () => {},
    closeModal = () => {},
    submitHandler = () => {},
    customSelectedElement = {},
    ...props
}){

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

    return(
        <Modal open={showModal} onClose={() => closeModal()}>
          <Box sx={styleModal}>
            <div>
              <p>¿{customMessage}<b>{customSelectedElement && customSelectedElement.name}</b>?</p>
            </div>
            <div>
              <Button color="secondary" onClick={() => submitHandler()}>Sí</Button>
              <br/>
              <Button onClick={() => closeModal()}>No</Button>
            </div>
          </Box>  
        </Modal>
    );

}

export default CustomModal;