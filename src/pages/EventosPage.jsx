import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FilterEventoBar from "../components/FilterEventoBar";
//import Card from "react-bootstrap/esm/Card";



const API_URL = import.meta.env.VITE_SERVER_URL;

function EventosPage() {
  const [eventos , setEventos] = useState([]);
  const [ciudadQuery, setCiudadQuery] = useState("");
  const [generoQuery, setGeneroQuery] = useState("");

  const handleChange = (event, updateState) => {
    updateState(event.target.value);
    if (!validateForm()) return;  
    setSubmitting(true);
  };

  const getAllEventos = () => {
    axios
      .get(`${API_URL}/api/eventos`)
      .then((response) => {
        setEventos(response.data);
      })
      .catch((error) => console.log(error));
  };

  //llamada al comienzo
  useEffect(() => {
    getAllEventos();
  }, []);

  //llamada cuando cambian los parámetros de busqueda de la barra de filtrado:
useEffect(() => {
  let queryString = "";
  if (ciudadQuery) queryString += `ciudad=${ciudadQuery}&`;
  if (generoQuery) queryString += `genero=${generoQuery}`;

  // Realiza la solicitud con la cadena de consulta construida
  axios
    .get(`${API_URL}/api/eventos?${queryString}`)
    .then((response) => {
      setEventos(response.data);
    })
    .catch((error) => console.log(error));
}, [ciudadQuery, generoQuery]);

  return (
    <>
<div 
className='container mt-5 min-vh-100'>    

 <div className="sticky-top bg-dark p-3">
    <FilterEventoBar
    ciudadQuery={ciudadQuery}
    setCiudadQuery={setCiudadQuery}
    generoQuery={generoQuery}
    setGeneroQuery={setGeneroQuery}
    handleChange={handleChange}
    />
</div>
    <hr />
      {eventos ?
        eventos.map(
          (evento, index) => (
        
              <Link
              className=""
              key={index}
              to={`/eventos/${evento._id}`}>
            <div>

              <h4>
                {evento.nombre}
              </h4>
              <p>{evento.descripcion}</p>

              </div>
              <hr />

              </Link>
          )
        ) : (
          <p>No hay eventos creados</p>
        )}</div>

    </>
  );
}

export default EventosPage;
