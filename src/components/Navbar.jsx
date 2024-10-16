
import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/signup">Registro</Link>
      <Link to="/login">Acceso</Link>
      <Link to="/profile-page">Ejemplo Privado</Link>
      <Link>Cerrar sesión</Link>
    </nav>
  );
}

export default Navbar;
