import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CrearEvento() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleCreateEvento = async (e) => {
    e.preventDefault();

    try {

      const newEvento = {
        nombre,fecha,direccion: { calle, ciudad },artista,genero,descripcion,precio, promoter
      }
      await axios.post("http://localhost:5005/api/evento", newEvento)
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

      <h1>Formulario de Registro</h1>
    
      <form onSubmit={handleCreateEvento}>
      artista,genero,descripcion,precio, promoter
        <label>Nombre del Evento:</label>
        <input
          type="text"
          name="nombre"
          value={nombre}
          onChange={handleNombreChange}
        />

        <br />

        <label>Fecha del evento:</label>
        <input
          type="text"
          name="fecha"
          value={fecha}
          onChange={handleUsernameChange}
        />

        <br />
        <h4>
        Dirección del evento:
        </h4>
        <label>Calle:</label>
        <input
          type="text"
          name="calle"
          value={calle}
          onChange={handlePasswordChange}
        />
        <label>Ciudad:</label>
        <input
          type="text"
          name="ciudad"
          value={ciudad}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Crear Evento</button>

        {errorMessage && <p>{errorMessage}</p>}

      </form>
      
    </div>
  );
}

export default CrearEvento;