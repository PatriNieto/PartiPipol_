import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_SERVER_URL;

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

function EventoEditarPage() {

  const [evento, setEvento] = useState({ ...DEFAULT_EVENTO_FORM_VALUES });
  const [loading, setLoading] = useState(true);
  const [artistas, setArtistas] = useState([]);

  const [filteredArtistas, setFilteredArtistas] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");


  //const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { eventoId } = useParams();

  const navigate = useNavigate();



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
        artista: artista._id,
      }));
      setFilteredArtistas([]);
    };



  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      ...evento,
    };

    axios
      .put(`${API_URL}/api/eventos/${eventoId}`, requestBody)
      .then(() => {
        console.log("llegamos")
        navigate(`/eventos`)})
      .catch((error) => console.log(error));
  };

   const handleBorrarEvento = () => {
    axios
      .delete(`${API_URL}/api/eventos/${evento._id}`)
      .then(() => navigate(`/eventos`))
      .catch((error) => console.log(error));
  }; 
 
  useEffect(() => {
    const getEvento = () => {
      axios
        .get(`${API_URL}/api/eventos/${eventoId}`)
        .then((response) => {

          setEvento(
            response.data
          );
          setLoading(false);
        })
        .catch((error) => console.log(error));
    };

    getEvento();
  }, [eventoId]);

  if (loading) return <div>Loading...</div>;


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
      <h3 className="text-2xl font-semibold text-gray-700 mb-6 sticky left-0">
        Actualizar Evento
      </h3>

{/*       {showDeleteConfirmation && (
        <div className="absolute top-0 left-0 w-72 h-48 bg-white flex flex-col justify-center items-center border border-gray-300 rounded-md p-4 shadow-md">
          <p className="mb-4">
            Are you sure you want to delete this cohortList?
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition duration-150 ease-in-out"
            >
              Yes
            </button>
            <button
              onClick={() => setShowDeleteConfirmation(false)}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-3 rounded transition duration-150 ease-in-out"
            >
              No
            </button>
          </div>
        </div>
      )} */}

      <form
        onSubmit={handleSubmit}
      >
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
            value={evento.artista.nombre}
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

        <button type="submit">Guardar cambios</button>

        {errorMessage && <p>{errorMessage}</p>}

  

           <button
          onClick={handleBorrarEvento}>
            Borrar Evento
          </button> 
      </form>
    </div>
  );
}

export default  EventoEditarPage;
