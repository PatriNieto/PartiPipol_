import React from 'react'
import catError from "../assets/imgs/404.jpg"

function ErrorPage() {
  return (
    <div
    className='container min-vh-100 d-flex flex-column justify-content-center align-items-center fs-1'>ErrorPage
   {/*  <h1>404</h1> */}
    <img src={catError} alt="" /></div>
  )
}

export default ErrorPage