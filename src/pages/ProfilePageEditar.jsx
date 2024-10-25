import { useState, useEffect, useCallback, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";


// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_SERVER_URL;

function ProfilePageEditar() {
  const { loggedUserId, authenticateUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    username: "",
    imagenDePerfil: ""
  });
  const [imagenDePerfil, setImagenDePerfil] = useState(null)
  const [username, setSsername] = useState(null)
  const [errorMessage, setErrorMessage] = useState("");


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

//comprobacion el nombnre de usuario existe?
const checkUsernameExists = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/api/user/check-username/${username}`);
    return response.data.exists;
  } catch (error) {
    setErrorMessage("El nombre de usuario ya está en uso. Por favor, elige otro.");
    return false;
  }
};
//la función de envio del formulario
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const usernameExists = await checkUsernameExists(userData.username);
      if (usernameExists) {
        setErrorMessage("El nombre de usuario ya está en uso. Por favor, elige otro.");
        return;
      }
    await axios.put(`${API_URL}/api/user/${loggedUserId}`, userData);
    navigate(`/profile-page`);
  } catch (error) {
    console.error("Error actualizando", error);
  }
};


//logica componente subir imagen de perfil con Cloudinary
// add to component where you are creating an item

// below state will hold the image URL from cloudinary. This will come from the backend.
const [imageUrl, setImageUrl] = useState(null); 
const [isUploading, setIsUploading] = useState(false); // for a loading animation effect

// below function should be the only function invoked when the file type input changes => onChange={handleFileUpload}
const handleFileUpload = async (event) => {
  // console.log("The file to be uploaded is: ", e.target.files[0]);
  if (!event.target.files[0]) {
    // to prevent accidentally clicking the choose file button and not selecting a file
    return;
  }
  setIsUploading(true); // to start the loading animation

  const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
  uploadData.append("imagenDePerfil", event.target.files[0]);
  //                   |
  //     this name needs to match the name used in the middleware in the backend => uploader.single("image")

  try {
    const response = await axios.post(`${API_URL}/api/upload/`, uploadData)
    // !IMPORTANT: Adapt the request structure to the one in your proyect (services, .env, auth, etc...)

    setImageUrl(response.data.imageUrl);
    //                          |
    //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });
    setUserData({ ...userData, imagenDePerfil: response.data.imageUrl });
    setIsUploading(false); // to stop the loading animation
  } catch (error) {
    navigate("/error");
  }
};

const handleBorrarUser = async ()=>{
  const confirmation = window.confirm("¿Quieres eliminar tu cuenta? Esta acción es irreversible.");
    if (!confirmation) return;
//guardamos el Token 
  const storedToken = localStorage.getItem("authToken");
  try {
    await axios.delete(`${API_URL}/api/user/${loggedUserId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
  localStorage.removeItem("authToken")
  await authenticateUser();
  navigate(`/signup`)
} catch (error) {
  console.log("error eliminando el usuario:", error)
}

}


  // loading handler here
  if (!userData) return <div>Cargando...</div>;

  return (
  <>
   <div className="row justify-content-center d-flex align-items-center m-0 min-vh-100">
    <div 
    className="text-light col-12 col-md-8 col-lg-10 m-0 overflow-hidden ">

  <form onSubmit={handleSubmit}>
      <label htmlFor="username">Nombre de Usuario</label>
      <input 
      type="text"
      name="username"
      value={userData.username}
      onChange={handleChange}
      />
<br />
<br />

    {/*       <label htmlFor="imagenDePerfil">Imagen de perfil:</label>
      <input 
      type="text"
      name="imagenDePerfil"
      value={userData.imagenDePerfil}
      onChange={handleChange}
      /> */}


    <div>
      <label>Image: </label>
      <input
      className="cloud"
        type="file"
        name="imagenDePerfil"
        onChange={handleFileUpload}
        disabled={isUploading}
      />
            {/* below disabled prevents the user from attempting another upload while one is already happening */}
  </div>

      {/* to render a loading message or spinner while uploading the picture */}
      {isUploading ? <h3>... uploading image</h3> : null}

      {/* below line will render a preview of the image from cloudinary */}
      {imageUrl ? (<div><img src={imageUrl} alt="img" width={200} /></div>) : null}
      <br />
        Este dato no se puede cambiar:
          <p>Email: {userData.email}</p>
          <div
          className="p-3 d-flex justify-content-center">
          <button
          type="submit">
            Guardar cambios
          </button>
          </div>
         
<div>
<button
          onClick={handleBorrarUser}
          className="bg-danger mt-5">
            Eliminar cuenta
          </button> 
</div>
    
          {errorMessage && <p>{errorMessage}</p>}
  </form>
  </div>
  </div>

  </>
  );
}

export default ProfilePageEditar;
