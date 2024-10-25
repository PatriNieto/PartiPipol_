import React from 'react'
import catError from "../assets/imgs/404.jpg"

function ErrorPage() {
  return (
    <div
    className='container min-vh-100 d-flex flex-column justify-content-center align-items-center fs-1'>ErrorPage
   {/*  <h1>404</h1> */}
    <img src={catError} 
    className='w-75'
    alt="error-IMG" /></div>
  )
}

export default ErrorPage