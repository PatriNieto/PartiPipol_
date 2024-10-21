import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FilterEventoBar from "../components/FilterEventoBar";
//import CohortFilterBar from "../components/CohortFilterBar";
//import CohortCard from "../components/CohortCard";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_SERVER_URL;

function EventosPage() {
  const [eventos , setEventos] = useState([]);
  const [ciudadQuery, setCiudadQuery] = useState("");
  const [generoQuery, setGeneroQuery] = useState("");

  const handleChange = (event, updateState) => {
    updateState(event.target.value);
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

    <FilterEventoBar
    ciudadQuery={ciudadQuery}
    setCiudadQuery={setCiudadQuery}
    generoQuery={generoQuery}
    setGeneroQuery={setGeneroQuery}
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
          <p>No hay eventos creados</p>
        )}
    </>
  );
}

export default EventosPage;
