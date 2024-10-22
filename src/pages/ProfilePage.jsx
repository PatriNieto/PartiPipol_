import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { Link } from 'react-router-dom';


function ProfilePage() {



  const [dataOnlyForLoggedUsers, setData] = useState(null)
  const { loggedUserId } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

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


  // loading handler here
  if (!userData) return <div>Cargando...</div>;

  return (
    <div>
      
      <h3>PROFILE PAGE</h3>
      <p>Solo usuarios resgistrados</p>

      <h1>{userData.username}</h1>
      <p>Email: {userData.email}</p>
      <img src={userData.imagenDePerfil} alt="imagen-perfil" />
      

{/*       solo podremos cambiar la imagen de perfil y la contraseña
 */}      <Link
          to={`/profile-page/editar`}>
          <button>
            Editar Perfil
          </button>
          </Link>

    </div>
  )
}

export default ProfilePage