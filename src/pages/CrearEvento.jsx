import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Conexión a la base de datos
const API_URL = import.meta.env.VITE_SERVER_URL;

// Definimos las propiedades que tendrá un evento
const DEFAULT_EVENTO_FORM_VALUES = {
  nombre: "",
  fecha: "",
  direccion: {
    calle: "",
    ciudad: "",
  },
  artista: "",
  genero: "",
  descripcion: "",
  precio: 0,
  promoter: "",
};

function CrearEvento({ artistaNombre}) {
  const navigate = useNavigate();

  // Inicializamos el evento con todas sus propiedades vacías
  const [evento, setEvento] = useState({ ...DEFAULT_EVENTO_FORM_VALUES });

  //artistas tendrán un manejo especial, los buscaremos directamente en la API de Lastfm
  const [artistSearch, setArtistSearch] = useState('');
  const [artistResults, setArtistResults] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Ejecución al enviar formulario de creación de evento
  const handleSubmit = (e) => {
    e.preventDefault();
    
    setSubmitting(true);

    const token = localStorage.getItem("authToken");

    const eventoData = { ...evento };

    // Si el artista está vacío, no lo incluimos en el objeto que se enviará
    if (eventoData.artista === '') {
      delete eventoData.artista; // Eliminar el campo artista si está vacío
    }

    console.log(eventoData); 
    // Hacemos llamada POST al servidor en la dirección
    axios
      .post(`${API_URL}/api/eventos/evento`, eventoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // Resetear el estado para limpiar los inputs
        setEvento({ ...DEFAULT_EVENTO_FORM_VALUES, artista: artistaNombre });
        setSubmitting(false);
        navigate("/eventos");
      })
      .catch((error) => {
        console.log(error);
         
        setSubmitting(false);
      });
  };

  const handleArtistSearch = async (artistName) => {
    if (!artistName) {
      setArtistResults([]); // Limpiar resultados si no hay entrada
      return;
    }
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/artists/search?artist=${artistName}`);

      const artists = response.data; 
      //limitamos el numero de resultados haciendo un slice sobre el resultado total
      setArtistResults(artists.slice(0, 5)); 
    } catch (error) {
      console.error("Error fetching artist search results:", error);
    }
  };


  const handleArtistSelect = (artist) => {
    setEvento((prevEvento) => ({
      ...prevEvento,
      artista: artist.name, // Asignar el nombre del artista seleccionado
    }));
    setArtistSearch(artist.name); // Actualizar el input con el nombre del artista seleccionado
    setArtistResults([]); // Limpiar los resultados
  };
  

  // Gestionar el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Solo tenemos un caso especial en calle y ciudad que componen dirección
    if (name === "calle" || name === "ciudad") {
      setEvento((prevEvento) => ({
        ...prevEvento,
        direccion: {
          ...prevEvento.direccion,
          [name]: value,
        },
      }));
    } else {
      setEvento((prevEvento) => ({
        ...prevEvento,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <h1>Crear un Evento</h1>

      <form onSubmit={handleSubmit}>
        <label>Nombre del Evento:</label>
        <input
          type="text"
          name="nombre"
          value={evento.nombre}
          onChange={handleChange}
        />

        <br />

        <label>Fecha del evento:</label>
        <input
          type="text"
          name="fecha"
          value={evento.fecha}
          onChange={handleChange}
        />

        <br />
        <h4>Dirección del evento:</h4>
        <label>Calle:</label>
        <input
          type="text"
          name="calle"
          value={evento.direccion.calle}
          onChange={handleChange}
        />
        <label>Ciudad:</label>
        <input
          type="text"
          name="ciudad"
          value={evento.direccion.ciudad}
          onChange={handleChange}
        />

        <br />

                <div>
                  <p>Artista invitado:</p>
          <input 
            type="text" 
            value={artistSearch} 
            onChange={(e) => {
              const searchValue = e.target.value;
              setArtistSearch(searchValue); 
              //llama a la funcion de busqueda
              handleArtistSearch(searchValue);
            }} 
            placeholder="Buscar artista..."
          />
          <ul>
            {//mostramos los posibles resultados
            artistResults.map((artist) => (
              <li key={artist.name} onClick={() => handleArtistSelect(artist)}>
                {artist.name}
              </li>
            ))}
          </ul>
        </div>

        <br />

        <label>Género:</label>
        <input
          type="text"
          name="genero"
          value={evento.genero}
          onChange={handleChange}
        />

        <br />
        <label>Descripción:</label>
        <input
          type="text"
          name="descripcion"
          value={evento.descripcion}
          onChange={handleChange}
        />

        <br />
        <label>Precio:</label>
        <input
          type="number"
          name="precio"
          value={evento.precio}
          onChange={handleChange}
        />

        <br />

        <button type="submit">Crear Evento</button>

        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default CrearEvento;
