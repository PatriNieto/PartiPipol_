import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Signup() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      const newUser = {
        email, password, username
      }
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, newUser)
      navigate("/login")
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
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">


      <h3
      className="pb-3">
      Regístrate
      </h3>
    
      <form onSubmit={handleSignup}>

        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br
        />
        <br />

        <label>Username:</label>
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
        <button  type="submit">Registrarse</button>

        </div>

        {errorMessage && <p>{errorMessage}</p>}

      </form>
      <hr />
      <p
      className="w-75">Si ya estás registrado &nbsp;
     <Link
     to="/login">
     <strong>  
      accede
      </strong>
     </Link>
     &nbsp;a tu cuenta.</p>
    </div>
  );
}

export default Signup;