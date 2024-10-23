import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchBar({
  nombreQuery,
  setNombreQuery,
  placeholder
  //handleChange
}) {
  return (
    <div className='d-flex justify-content-center'>
      <input 
      className='w-100'
      type="text"
      name="nombre"
      value={nombreQuery}
      placeholder={placeholder}
      onChange={(e) =>setNombreQuery(e.target.value)} />
    </div>
  )
}

export default SearchBar