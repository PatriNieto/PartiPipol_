
import { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import '../styles/MyNavbar.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';



function MyNavbar() {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  //nos pasamos la variable de AuthContext
  const { isLoggedIn, authenticateUser, loggedUser } = useContext(AuthContext)

 
  

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
    <>
    <Navbar expand="md" className="navbar-dark bg-black fixed-top">
      <Container>

        <Navbar.Brand 
        as={Link} 
        to="/">
          PartiPipol
      </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
            <Nav.Link className="fs-7" as={Link} to="/eventos">Eventos</Nav.Link>
            <Nav.Link 
            as={Link} 
            to="/artistas"
            >Artistas</Nav.Link>
        </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
        {isLoggedIn ?
         <Navbar.Text
         onClick={handleShow}>
           Sesión iniciada: <a href="#login">{loggedUser}</a> {/* cambiar link */} 
         </Navbar.Text> : 
          <Navbar.Text
          onClick={handleShow}>
            Usuario no logueado
             <a href="#login">{loggedUser}</a> {/* cambiar link */} 
          </Navbar.Text>
        }
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
            
    <Offcanvas 
    show={show} 
    onHide={handleClose}
    placement={"end"} name={"end"} 
    className="bg-dark text-light"
    scroll= "true"
    >


        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{loggedUser}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
       {/*  <Nav.Link>
          Favoritos
        </Nav.Link>
        <Nav.Link>
          Siguiendo
        </Nav.Link> */}
      {!isLoggedIn &&  
        <Nav.Link
        as={Link}
        to="/signup">
          Registro
        </Nav.Link>}
        {!isLoggedIn &&  
        <Nav.Link
        as={Link}
        to="/login">
          Acceso
        </Nav.Link>}
        {isLoggedIn &&  
        <Nav.Link
        as={Link}
        to="/profile-page">
          Perfil
        </Nav.Link>}
        {isLoggedIn && 
          <Nav.Link
          as={Link}
          to="/evento-crear">
          Crear evento
        </Nav.Link>
        }
        

   
        {isLoggedIn &&  
        <Nav.Link
        onClick={handleLogOut}>
          Cerrar sesión
        </Nav.Link>}

       
     
        </Offcanvas.Body>
      </Offcanvas>
      
     
      </>
  );
}

export default MyNavbar;
