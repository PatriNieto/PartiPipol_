import React, { useContext } from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { format } from 'date-fns'; 
import { Link } from 'react-router-dom';


function EventosAsistirePage() {
  const [todosEventos, setodosEventos] = useState([])
  const { loggedUserId,loggedUser } = useContext(AuthContext); 

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
<div 
className='container mt-3 min-vh-100'>
  <h6
  className='fs-2 mt-3'> Hola, {loggedUser}</h6>
    <hr />
      <div>
        <p>
        Eventos a los que asistirás:
        </p>

        {asistireEventos.length > 0 ? (
          asistireEventos.map((evento, index) => (
            <Link
            className=""
            key={index}
            to={`/eventos/${evento._id}`}>
            <div key={evento._id}>
        
              <h4>{evento.nombre}</h4>
              <p>{evento.fecha ? format(new Date(evento.fecha), 'dd/MM/yyyy'): 'Fecha no disponible'}</p>
              <p>{evento.direccion.ciudad}</p>
            </div>
            </Link>
          ))
        ) : (
          <p>No tienes ningún evento planeado.</p>
        )}
      </div>
   <hr />
{/* //otra parte con los eventos creados por mi
 */}      <div>
          <p>
          Eventos creados por ti:
          </p>

        {misEventos.length > 0 ? (
          misEventos.map((evento, index) => (
            <Link
            className=""
            key={index}
            to={`/eventos/${evento._id}`}>
            <div 
            key={evento._id}>
              <h4>{evento.nombre}</h4>

              <p>{evento.fecha ? format(new Date(evento.fecha), 'dd/MM/yyyy'): 'Fecha no disponible'}</p>

              <p>{evento.direccion.ciudad}</p>
            </div>
            </Link>

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