import "./App.css";
import { Routes, Route } from "react-router";




// components
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ErrorPage from "./pages/ErrorPage";
import Private from "./components/auth/Private";
import CrearEvento from "./pages/CrearEvento";
import CrearArtista from "./pages/CrearArtista";
import ArtistasPage from "./pages/ArtistasPage";
import ArtistaDetailsPage from "./pages/ArtistaDetailsPage";
import ArtistaEditarPage from "./pages/ArtistaEditarPage";

function App() {

  return (
    <div>
      <Navbar />

      <br />
      <hr />

      <Routes>
        {/* rutas de front */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/evento" element={<CrearEvento />} />
        <Route path="/artista-crear" element={<CrearArtista />} />
        <Route path="/artistas" element={<ArtistasPage />} />
        <Route path="/artistas/:artistaId" element={<ArtistaDetailsPage />} />
        <Route path="/artistas/editar/:artistaId" element={<ArtistaEditarPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/profile-page" element={
          <Private>
            <ProfilePage />
          </Private>
          } />

        {/* error FE routes here... */}

      </Routes>
    </div>
  )
}

export default App