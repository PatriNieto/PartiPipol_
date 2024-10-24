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
    <div
    className='container min-vh-100 d-flex flex-column justify-content-between p-5'>
    
      <h1>{userData.username}</h1>
      <p>Email: {userData.email}</p>
      <img
      className="mw-100 w-75"
      src={userData.imagenDePerfil} alt="imagen-perfil" />
      

{/*       solo podremos cambiar la imagen de perfil y la contraseña
 */}      <Link
          to={`/profile-page/editar`}>
          <button
          className='mt-3'>
            Editar Perfil
          </button>
          </Link>

    </div>
  )
}

export default ProfilePage