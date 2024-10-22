import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



function HomePage() {
  const [eventos , setEventos] = useState([]);
  const [nombreQuery, setNombreQuery] = useState("");

  const API_URL = import.meta.env.VITE_SERVER_URL;

  const handleChange = (event, updateState) => {
    updateState(event.target.value);
  };



/*   const getAllEventos = () => {
    axios
      .get(`${API_URL}/api/eventos`)
      .then((response) => {
        setEventos(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllEventos();
  }, []); */

  //llamada cuando cambian los parámetros de busqueda de la barra de filtrado:
useEffect(() => {
  if(nombreQuery){
  let queryString = "";
  if (nombreQuery) queryString += `nombre=${nombreQuery}`;

  // Realiza la solicitud con la cadena de consulta construida
  axios
    .get(`${API_URL}/api/eventos?${queryString}`)
    .then((response) => {
      setEventos(response.data);
      console.log(response.data)
    })
    .catch((error) => console.log(error));} else {
      setEventos([])
    }
}, [nombreQuery]);


  return (
    <>
    <div className=' d-flex flex-column w-100'>
    <h2>Busca un evento:</h2>
  <SearchBar 
      nombreQuery={nombreQuery}
      setNombreQuery={setNombreQuery}
      handleChange={handleChange}
      />

{eventos ?
        eventos.map(
          (evento, index) => (
        
              <Link
              key={index}
              to={`/eventos/${evento._id}`}>
            <div>

              <h2>
                {evento.nombre}
              </h2>
              <p>{evento.descripcion}</p>

              </div>

              </Link>
          )
        ) : (
          <p>No hay eventos con ese nombre</p>
        )}

        <Link
        to="/eventos">
        <p>
        Ver Todos los eventos
        </p>
        </Link>
        </div>
        
    </>
  )
}

export default HomePage





/*



    
    </>
  );
}
   */