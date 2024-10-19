import "./App.css";
import { Routes, Route } from "react-router";

// components
import MyNavbar from "./components/MyNavbar"
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
import EventosPage from "./pages/EventosPage";
import EventoDetailsPage from "./pages/EventoDetailsPage";
import EventoEditarPage from "./pages/EventoEditarPage";


function App() {

  return (
    <div>
      <MyNavbar />

      <br />
      <hr />

      <Routes>
        {/* rutas de front */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/evento" element={<CrearEvento />} />
        <Route path="/eventos" element={<EventosPage />} />
        <Route path="/eventos/:eventoId" element={<EventoDetailsPage />} />
        <Route path="/evento-crear" element={<CrearEvento />} />
        <Route path="/eventos/editar/:eventoId" element={<EventoEditarPage />} />
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