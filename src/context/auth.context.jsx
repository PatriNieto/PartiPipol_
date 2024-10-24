import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'; 
//tendremos que crear dos componentes : contexto y envoltorio

//contexto: 
const AuthContext = createContext()

//envoltorio:
function AuthWrapper(props) {
  //esta logueado?
  const  [isLoggedIn, setIsLoggedIn] = useState(false)
  //quien esta logueado?
  const [loggedUserId, setLoggedUserId] = useState(null)
  //el nombre de quien esta logueado para mostrarlo en el perfil y la barra de navegaciónç
  const [loggedUser, setLoggedUser] = useState(null);

  //le damos un tiempo para validar el token antes de pintar la aplicaciojn
  const [isValidatingToken, setIsValidatingToken] = useState(true)

  //hacemos un useEffect para llamar a verify cuando el usuario entre en la pagina y se verifique su token
  useEffect(() =>{
    authenticateUser()
  }, [])

  const authenticateUser = async ()=>{
    //esta función es la que pasara por verify, la funcion que verifica el Token
    //la utilizaremos cuando hagamos login, logout o cuando volvamos a la app

    try {
      //buscamos el token 
      const authToken = localStorage.getItem("authToken")
      console.log("authToken", authToken)
      //le pasamos el token encontrado  como segundo argumento para que verify lo pueda verificar 
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify`, {
        headers : { authorization:`Bearer ${authToken}`}
      })

      //console.log(response)
      //el token es ok:
      setIsLoggedIn(true)
      setLoggedUserId(response.data._id)
      setLoggedUser(response.data.username)
      setIsValidatingToken(false)
    } catch (error) {
      //el token no es valido o no existe
      console.log(error)
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setLoggedUser(null)
      setIsValidatingToken(false)
    }
  }

  //creamos un objeto con estas variables
  const passedContext = {
    isLoggedIn,loggedUserId,loggedUser,authenticateUser
  }

  if(isValidatingToken){  
    //podemos cambiar esto por un spinner
    return (  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Validando usuario...</span>
      </Spinner>
    </div>)  
  }
  return (
    <AuthContext.Provider
    //el contexto que estara compartiendo con la aplicacion
    value={
      passedContext
    }>
      {props.children}

    </AuthContext.Provider>
  )
}

//exportamos los dos componentes
export {
  AuthContext,
  AuthWrapper
}

