import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CrearArtista() {
  const navigate = useNavigate()

  const [nombre, setNombre] = useState("")
  const [imagen, setImagen] = useState("")
  const [biografia, setBiografia] = useState("")
  const [spotify, setSpotify] = useState("")
  const [instagram, setInstagram] = useState("")
  const [errorMessage, setErrorMessage ] = useState("")


  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleImagenChange = (e) => setImagen(e.target.value);
  const handleBiografiaChange = (e) => setBiografia(e.target.value);
  const handleSpotifyChange = (e) => setSpotify(e.target.value);
  const handleInstagramChange = (e) => setInstagram(e.target.value);

  const hadleArtistaCreation = async (e) => {
    e.preventDefault();

    try {
      const newArtista = {
        nombre, imagen, biografia,  enlaces: {
          spotify,
          instagram
        }
      }
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/artistas/artista`, newArtista)
      navigate("/")
    } catch (error) {
      console.log(error)
      //sacamos el mensaje por el cual no se crea el usuario 
      if(error.response.status === 400){
        setErrorMessage(error.response.data.message)
      } else {
        navigate("/error")
      }
    }
  };

  return (
    <div>

      <h1>Crear un Artista:</h1>
    
      <form onSubmit={hadleArtistaCreation}>

        <label>Nombre del artista:</label>
        <input
          type="text"
          name="nombre"
          value={nombre}
          onChange={handleNombreChange}
        />

        <br />

        <label>Imagen:</label>
        <input
          type="text"
          name="imagen"
          value={imagen}
          onChange={handleImagenChange}
        />

        <br />

        <label>Biografia:</label>
        <input
          type="text"
          name="biografia"
          value={biografia}
          onChange={handleBiografiaChange}
        />
           <br />
          <h4>
            Enlaces:
          </h4>
          <label>Spotify:</label>
          <input
            type="text"
            name="spotify"
            value={spotify}
            onChange={handleSpotifyChange}
          />
            <label>Instagram:</label>
          <input
            type="text"
            name="instagram"
            value={instagram}
            onChange={handleInstagramChange}
          />
      

        <br />

        <button type="submit">Crear Artista</button>

        {errorMessage && <p>{errorMessage}</p>}

      </form>
      
    </div>
  );
}

export default CrearArtista;