import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/auth.context";

function BotonAsistencia({ eventoId, onToggleAsistencia }) {
  const [isAttending, setIsAttending] = useState(false);
  const { loggedUserId } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_SERVER_URL;
  const token = localStorage.getItem("authToken");

  // Verificar si el usuario ya está marcado como asistente al cargar la página
  useEffect(() => {
    const checkIfAttending = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/eventos/${eventoId}`);
        const evento = response.data;
        setIsAttending(evento.asistentes.includes(loggedUserId));
      } catch (error) {
        console.error("Error al verificar asistencia:", error);
      }
    };

    checkIfAttending();
  }, [eventoId, loggedUserId, API_URL]);

  const toggleAttendance = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/eventos/${eventoId}/asistir`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Alternar estado local
      setIsAttending((prev) => !prev);
      // Llamar a la función para actualizar los detalles del evento
      onToggleAsistencia();
    } catch (error) {
      console.error("Error al actualizar asistencia:", error);
    }
  };

  return (
    <button onClick={toggleAttendance}>
      {isAttending ? "No asistiré" : "Asistiré"}
    </button>
  );
}

export default BotonAsistencia;
