import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';


function SearchBar({
  nombreQuery,
  setNombreQuery,
  placeholder
  //handleChange
}) {
  return (
    
    <div className='d-flex justify-content-center'>
      <TextField id="outlined-basic" label={placeholder} variant="filled" 
   
      className='w-100 bg-light'
      type="text"
      name="nombre" 
      value={nombreQuery}
      
      onChange={(e) =>setNombreQuery(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        )
      }} />
         
    </div>
  )
}

export default SearchBar