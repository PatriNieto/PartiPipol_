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
  <form onSubmit={handleSubmit}>
      <label htmlFor="username">Nombre de Usuario</label>
      <input 
      type="text"
      name="username"
      value={userData.username}
      onChange={handleChange}
      />


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
        type="file"
        name="imagenDePerfil"
        onChange={handleFileUpload}
        disabled={isUploading}
      />
            {/* below disabled prevents the user from attempting another upload while one is already happening */}
  </div>;

      {/* to render a loading message or spinner while uploading the picture */}
      {isUploading ? <h3>... uploading image</h3> : null}

      {/* below line will render a preview of the image from cloudinary */}
      {imageUrl ? (<div><img src={imageUrl} alt="img" width={200} /></div>) : null}

        Este dato no se puede cambiar:
          <p>Email: {userData.email}</p>

          <button
          type="submit">
            Guardar cambios
          </button>

          <button
          onClick={handleBorrarUser}>
            Eliminar cuenta
          </button> 

  </form>

  </>
  );
}

export default ProfilePageEditar;
