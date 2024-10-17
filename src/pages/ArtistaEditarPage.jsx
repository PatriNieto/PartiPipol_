
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_SERVER_URL;

const DEFAULT_ARTISTA_FORM_VALUES = {
  nombre:"", 
  imagen: "", 
  biografia: "",  
  enlaces: {
    spotify:"",
    instagram:""
  }
};

function ArtistaEditarPage() {
  const [artista, setArtista] = useState({ ...DEFAULT_ARTISTA_FORM_VALUES });
  const [loading, setLoading] = useState(true);
  //const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { artistaId } = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setArtista((prevArtista) => ({
      ...prevArtista,
      [name]: value,
    }));


   /*  setArtista((prevArtista) => ({
      ...prevCohort,
      cohortSlug,
      cohortName,
      [name]: type === "checkbox" ? checked : value,
    })); */
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      ...artista,
    };

    axios
      .put(`${API_URL}/api/artistas/${artistaId}`, requestBody)
      .then(() => {
        console.log("llegamos")
        navigate(`/artistas`)})
      .catch((error) => console.log(error));
  };

   const handleDeleteArtista = () => {
    axios
      .delete(`${API_URL}/api/artistas/${artista._id}`)
      .then(() => navigate(`/artistas`))
      .catch((error) => console.log(error));
  };
 
  useEffect(() => {
    const getArtista = () => {
      axios
        .get(`${API_URL}/api/artistas/${artistaId}`)
        .then((response) => {

          setArtista(
            response.data
          );
          setLoading(false);
        })
        .catch((error) => console.log(error));
    };

    getArtista();
  }, [artistaId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-700 mb-6 sticky left-0">
        Actualizar Artista
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

<label>Nombre del artista:</label>
        <input
          type="text"
          name="nombre"
          value={artista.nombre}
          onChange={handleChange}
        />

        <br />

        <label>Imagen:</label>
        <input
          type="text"
          name="imagen"
          value={artista.imagen}
          onChange={handleChange}
        />

        <br />

        <label>Biografia:</label>
        <input
          type="text"
          name="biografia"
          value={artista.biografia}
          onChange={handleChange}
        />
           <br />
          <h4>
            Enlaces:
          </h4>
          <label>Spotify:</label>
          <input
            type="text"
            name="spotify"
            value={artista.enlaces.spotify}
            onChange={handleChange}
          />
            <label>Instagram:</label>
          <input
            type="text"
            name="instagram"
            value={artista.enlaces.instagram}
            onChange={handleChange}
          />
      



        <br />

        <button
         type="submit">         
         Guardar cambios</button>

            <button
          onClick={handleDeleteArtista}>
            Borrar artista
          </button>
      </form>
    </div>
  );
}

export default  ArtistaEditarPage;
