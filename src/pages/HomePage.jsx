import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/HomePage.css"




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

    

      <div className="container d-flex flex-column align-items-left justify-content-center min-vh-100 bg-dark text-light p-10">
        <div className="sticky-top bg-dark p-3">
    <h2>Encuentra un evento:</h2>
  <SearchBar 
      nombreQuery={nombreQuery}
      setNombreQuery={setNombreQuery}
      placeholder={"Escribe el nombre de un evento o de un artista"}
      />
</div>
<ul className="eventos-dropdown bg-dark">
{eventos ?
        eventos.map(
          (evento, index) => (
        
              <Link
              key={index}
              to={`/eventos/${evento._id}`}>


              <div >
              <div >

              <h5 className="card-title">{evento.nombre}</h5>
              <p className="card-text">{evento.descripcion}</p>
         

              </div>
              </div>

              </Link>
          )
        ) : (
          <p>No hay eventos con ese nombre</p>
        )}
        </ul>
</div>

        <div
        className=' text-center'>
        <Link
        to="/eventos"
        className='text-light p-5 min-vh-50'>
          <div
          className='container bg-dark py-10'>
          <h4
          className='link-hover-effect'>
          Ver todos los eventos
          </h4>
          </div>
        </Link>
        <div
          className='container bg-dark py-10'>
            <p
            className='m-0'>
            Eres promotor?
            </p>
            
        <Link
        to="/evento-crear"
        className='text-light p-5 min-vh-50'>
          
          <h4
           className='link-hover-effect'>
          Crea tu evento
          </h4>
          
        </Link>
        </div>
       
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