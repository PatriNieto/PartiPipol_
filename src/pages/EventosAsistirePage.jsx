import React, { useContext } from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function EventosAsistirePage() {
  const [todosEventos, setodosEventos] = useState([])
  const { loggedUserId } = useContext(AuthContext); 

  const API_URL = import.meta.env.VITE_SERVER_URL;


  useEffect(() => {
    // Reutilizar la llamada a la API existente para obtener todos los eventos
    const fetchEventos = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/eventos`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setodosEventos(response.data);
      } catch (error) {
        console.error("Error fetching eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  // Filtrar eventos a los que el usuario asistirá
  const asistireEventos = todosEventos.filter((evento) =>
    evento.asistentes.includes(loggedUserId)
  );

  // Filtrar eventos creados por el usuario
  const misEventos = todosEventos.filter(
    (evento) => evento.promoter === loggedUserId
  );
  return (
    <>
{    //una parte con los eventos a los que asistire
}
<div>
      <div>
        <h3>Eventos a los que asistirás:</h3>
        {asistireEventos.length > 0 ? (
          asistireEventos.map((evento) => (
            <div key={evento._id}>
              <h4>{evento.nombre}</h4>
              <p>{evento.fecha}</p>
              <p>{evento.direccion.ciudad}</p>
            </div>
          ))
        ) : (
          <p>No tienes ningún evento planeado.</p>
        )}
      </div>
{/* //otra parte con los eventos creados por mi
 */}      <div>
        <h3>Eventos creados por ti:</h3>
        {misEventos.length > 0 ? (
          misEventos.map((evento) => (
            <div key={evento._id}>
              <h4>{evento.nombre}</h4>
              <p>{evento.fecha}</p>
              <p>{evento.direccion.ciudad}</p>
            </div>
          ))
        ) : (
          <p>No has creado ningún evento.</p>
        )}
      </div>
    </div>
 

    </>
  )
}

export default EventosAsistirePage