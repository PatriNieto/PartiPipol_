import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { Spinner } from "react-bootstrap"; 

function Login() {

  const navigate = useNavigate()

  const { authenticateUser } = useContext(AuthContext)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredentials  = {
        username, password
      }

      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, userCredentials)
      console.log(response)

      localStorage.setItem("authToken", response.data.authToken)

      
      await authenticateUser()


      navigate("/profile-page")

    } catch (error) {
      console.log(error)
      //sacamos el mensaje por el cual no se crea el usuario 
      if(error.response.status === 400){
        setErrorMessage(error.response.data.message)
      } else {
        navigate("/error")
      }
    }finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">


    <h3
    className="pb-3">
    Formulario de Acceso
    </h3>


      <form onSubmit={handleLogin}>
        <label>Nombre de usuario:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />
        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />
        <br />
        <br />

        <div
        className="d-flex justify-content-center">
        <button type="submit" disabled={loading}> 
            {loading ? <Spinner animation="border" size="sm" /> : 'Acceder'} 
          </button>
        </div>
     
        {errorMessage && <p>{errorMessage}</p>}


      </form>
      <hr />
      <p
      className="w-75">Si no tienes una cuenta &nbsp;
     <Link
     to="/signup">
     <strong>  
      regístrate
      </strong>
     </Link>
     &nbsp;para estar al día de los eventos de tu ciudad.</p>
      
    </div>
  );
}

export default Login;