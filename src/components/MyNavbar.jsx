import { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import '../styles/MyNavbar.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

function MyNavbar() {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const handleClose = () => {
    setShow(false);
    setExpanded(false); 
  };
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const { isLoggedIn, authenticateUser, loggedUser } = useContext(AuthContext);

  const handleLogOut = async () => {
    try {
      localStorage.removeItem("authToken");
      await authenticateUser();
      navigate("/");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar 
        expand="md" 
        className="navbar-dark bg-black fixed-top" 
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      >
        <Container>
          <Navbar.Brand 
            onClick={handleClose}
            as={Link} 
            to="/"
          >
            PartiPipol
          </Navbar.Brand>

          <Navbar.Toggle 
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)} 
          />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link 
                className="fs-7" 
                as={Link} 
                to="/eventos" 
                onClick={handleClose}
              >
                Eventos
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/artists"
                onClick={handleClose}
              >
                Artistas
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end">
            {isLoggedIn ?
              <Navbar.Text onClick={handleShow}>
                Sesión iniciada: <a href="#login">{loggedUser}</a>
              </Navbar.Text> : 
              <Navbar.Text onClick={handleShow}>
                Usuario no logueado <a href="#login">{loggedUser}</a>
              </Navbar.Text>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas 
        show={show} 
        onHide={handleClose}
        placement={"end"} 
        className="bg-dark text-light"
        scroll="true"
        className="p-5 bg-dark text-light"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{loggedUser}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
        className="d-flex flex-column fs-5">
          {!isLoggedIn &&  
            <Nav.Link
              as={Link}
              to="/signup"
              onClick={handleClose}
            >
              Registro
            </Nav.Link>
          }
          <br />
          {!isLoggedIn &&  
            <Nav.Link
              as={Link}
              to="/login"
              onClick={handleClose}
            >
              Acceso
            </Nav.Link>
          }
          {isLoggedIn &&  
            <Nav.Link
              as={Link}
              to="/profile-page"
              onClick={handleClose}
            >
              Perfil
            </Nav.Link>
          }
          <br />

          {isLoggedIn && 
            <Nav.Link
              as={Link}
              to="/mis-eventos"
              onClick={handleClose}
            >
              Mis eventos
            </Nav.Link>
          }
          <br />
          {isLoggedIn && 
            <Nav.Link
              as={Link}
              to="/evento-crear"
              onClick={handleClose}
            >
              Crear evento
            </Nav.Link>
          }
          <br />

          {isLoggedIn &&  
            <Nav.Link
              onClick={handleLogOut}
            >
              Cerrar sesión
            </Nav.Link>
          }
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MyNavbar;
