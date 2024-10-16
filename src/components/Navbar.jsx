
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const navigate = useNavigate()
  //nos pasamos la variable de AuthContext
  const { isLoggedIn, authenticateUser } = useContext(AuthContext)

  const handleLogOut = async () =>{


    try {
      localStorage.removeItem("authToken")
      await authenticateUser()
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      {!isLoggedIn &&  <Link to="/signup">Registro</Link>}
      {!isLoggedIn &&  <Link to="/login">Acceso</Link>}
      {isLoggedIn &&   <Link to="/profile-page">Perfil</Link>}
      {isLoggedIn &&   <Link onClick={handleLogOut}>Cerrar sesión</Link>}

     
      
      
     
    </nav>
  );
}

export default Navbar;
