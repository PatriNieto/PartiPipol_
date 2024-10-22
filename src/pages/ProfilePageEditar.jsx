import { useState, useEffect, useCallback, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_SERVER_URL;

function ProfilePageEditar() {
  const { loggedUserId } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    username: "",
    imagenDePerfil: ""
  });
  const [imagenDePerfil, setImagenDePerfil] = useState(null)
  const [username, setSsername] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/${loggedUserId}`);
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [loggedUserId]);

//funcion handle para el cambio en el formulario
const handleChange = (e) => {
  const { name, value } = e.target;
  setUserData({ ...userData, [name]: value });
};
//la función de envio del formulario
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.put(`${API_URL}/api/user/${loggedUserId}`, userData);
    navigate(`/profile-page`);
  } catch (error) {
    console.error("Error actualizando", error);
  }
};

  // loading handler here
  if (!userData) return <div>Cargando...</div>;

  return (
  <>
  <form onSubmit={handleSubmit}>
      <label htmlFor="username">Nombre de Usuario</label>
      <input 
      type="text"
      name="username"
      value={userData.username}
      onChange={handleChange}
      />
          <label htmlFor="imagenDePerfil">Imagen de perfil:</label>
      <input 
      type="text"
      name="imagenDePerfil"
      value={userData.imagenDePerfil}
      onChange={handleChange}
      />

        Este dato no se puede cambiar:
          <p>Email: {userData.email}</p>

          <button
          type="submit">
            Guardar cambios
          </button>

  </form>

  </>
  );
}

export default ProfilePageEditar;
