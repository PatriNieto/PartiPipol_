import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_SERVER_URL;

function EventoDetailsPage() {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  const { eventoId } = useParams();

  const getEvento = useCallback(() => {
    axios
      .get(`${API_URL}/api/eventos/${eventoId}`)
      .then((response) => {
        const oneEvento = response.data;
        setEvento(oneEvento);
      })
      .catch((error) => console.log(error));
  }, [eventoId]);

  useEffect(() => {
    getEvento();
    //getStudents();
    setLoading(false);
  }, [eventoId, getEvento]);

  return (
    <div>
   
        {/* Evento details */}
        <div>
          {evento && (
            <>
              <h1 className="text-2xl font-semibold mb-4">
                {evento.nombre}
              </h1>
              <p>{evento.fecha}</p>
              <br />
              <p className="mb-2 border-b pb-2">
                <strong>Descripción:</strong> {evento.descripcion}
              </p>
              <p className="mb-2 border-b pb-2">
                <strong>Dirección:</strong> 
                <br />
                {evento.direccion.calle},
                {evento.direccion.ciudad}
              </p>

              {evento.artista ? (
                <div>
                   <p>
                  Artistas invitados:
                 </p> 
                 <p>
                  {evento.artista}
                </p>
                </div>
               
              ):(
                <p>
                Este evento no tiene artistas 
                </p>
              )}

              {evento.genero && (
                <p>
                  {evento.genero}
                </p>
              )}

              <p>Precio: {evento.precio}€</p>
            </>
          )}

          <br />
          <Link
          to={`/eventos/editar/${eventoId}`}>
          <button>
            Editar evento
          </button>
          </Link>
         
        </div>

     

        {loading && <div>Loading...</div>}

      </div>

  );
}

export default EventoDetailsPage;
