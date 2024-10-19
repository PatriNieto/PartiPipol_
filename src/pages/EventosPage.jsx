import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import CohortFilterBar from "../components/CohortFilterBar";
//import CohortCard from "../components/CohortCard";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_SERVER_URL;

function EventosPage() {
  const [eventos , setEventos] = useState([]);


  const getAllEventos = () => {
    axios
      .get(`${API_URL}/api/eventos`)
      .then((response) => {
        setEventos(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllEventos();
  }, []);

  return (
    <>


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
