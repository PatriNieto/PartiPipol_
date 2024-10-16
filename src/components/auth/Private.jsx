import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import { Navigate } from 'react-router-dom'


//hacemos un componente envoltorio que todo lo que recibe lo renderiza
function Private(props) {

  const {isLoggedIn } = useContext(AuthContext)

  if(isLoggedIn){
    return props.children
  } else {
    return <Navigate to={"/login"}/>
  }
}

export default Private