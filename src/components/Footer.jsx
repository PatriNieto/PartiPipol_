import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/Footer.css'


function Footer() {
  return (
    <footer  className="expand-md bg-black text-light py-4 fs-18 pt-5" >
    <Container>
      <Row>
        <Col md={4}>
          <h5>Sobre nosotros</h5>
          <p>Conecta tus eventos</p>
        </Col>
        
        <Col md={4}>
          <h5>Contacto</h5>
          <address>
            Gran Vía 123<br />

          </address>
        </Col>
      {/*   <Col md={4}>
        Email: <a href="mailto:info@restaurant.com" className="text-light">info@restaurant.com</a>

        </Col>
 */}
      </Row>
      <hr />
      <Row>
        <Col className="text-center">
          <p className="mb-0">©  Made by partying people in 2024</p>
        </Col>
      </Row>
    </Container>
  </footer>
  )
}

export default Footer