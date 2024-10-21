import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí manejarías la autenticación y los tokens que te devuelva Last.fm
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token'); // solo como ejemplo

    if (token) {
      // Guarda el token o realiza cualquier acción necesaria
      localStorage.setItem('lastfmToken', token);
      navigate('/eventos'); // Redirige a la página que quieras después de autenticación
    }
  }, []);

  return (
    <div>
      <h2>Accediendo...</h2>
    </div>
  );
}

export default CallbackPage;
