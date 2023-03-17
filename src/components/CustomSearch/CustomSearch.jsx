import React from 'react';
import {TextField, InputAdornment} from '@mui/material/';
import {Search, Clear} from '@mui/icons-material';

function CustomSearch({
    customSize = "",
    customVariant = "outlined",
    customPlaceholder = "", 
    onChangeHandler = () => {},
    customValue = "",
    customClearIcon = "",
    onClearHandler = () => {},
    ...props
}){

    return (
            <TextField
                  size={customSize}
                  variant={customVariant}
                  placeholder={customPlaceholder}
                  onChange={onChangeHandler}
                  value={customValue}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        style={{ display: customClearIcon }}
                        onClick={onClearHandler}
                      >
                        <Clear />
                      </InputAdornment>
                    )
                  }}
            />
    );

}

export default CustomSearch;