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

function CrearEvento({ artistaId, artistaNombre}) {
  const navigate = useNavigate();

  // Inicializamos el evento con todas sus propiedades vacías
  const [evento, setEvento] = useState({ ...DEFAULT_EVENTO_FORM_VALUES });
  const [artistas, setArtistas] = useState([]);
  const [filteredArtistas, setFilteredArtistas] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Ejecución al enviar formulario de creación de evento
  const handleSubmit = (e) => {
    e.preventDefault();
    // Creamos un objeto copia del evento pero asignamos el ID del artista
    const requestBody = { ...evento, artista: artistaId };

    setSubmitting(true);
    console.log(requestBody)
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

  // Cargar todos los artistas desde la API
  useEffect(() => {
    const fetchArtistas = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/artistas`);
        setArtistas(response.data);
      } catch (error) {
        console.log(error);
        setErrorMessage("Error al cargar los artistas");
      }
    };

    fetchArtistas();
  }, []);

  // Gestionar el cambio en el campo de búsqueda de artistas
  const handleArtistInputChange = (e) => {
    const { value } = e.target;
    setEvento((prevEvento) => ({
      ...prevEvento,
      artista: value,
    }));

    // Filtrar la lista de artistas según la entrada del usuario
    const filtered = artistas.filter((artista) =>
      artista.nombre.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredArtistas(filtered);
  };

  // Seleccionar un artista de las sugerencias
  const handleArtistSelect = (artista) => {
    setEvento((prevEvento) => ({
      ...prevEvento,
      artista: artista.nombre,
    }));
    setFilteredArtistas([]);
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
          <label>Artista:</label>
          <input
            type="text"
            name="artista"
            value={evento.artista}
            onChange={handleArtistInputChange}
          />
          {/* Mostrar sugerencias de artistas */}
          {filteredArtistas.length > 0 && (
            <ul>
              {filteredArtistas.map((artista) => (
                <li
                  key={artista._id}
                  onClick={() => handleArtistSelect(artista)}
                  style={{ cursor: "pointer" }}
                >
                  {artista.nombre}
                </li>
              ))}
            </ul>
          )}
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
