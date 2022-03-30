import React from 'react'
import { InputAdornment, TextField, Grid, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const InputField = ({ halfWidth, name, label, handleChange, autoFocus, type, handleSeePassword }) => {
  return (
    <Grid item xs={12} sm={halfWidth ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="standard"
        fullWidth
        label={label}
        required
        autoFocus={autoFocus}
        type={type}
        InputProps={name === 'password' ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSeePassword}>
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        } : null}
      />
    </Grid>
  );
}

export default InputField;