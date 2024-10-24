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
import ArtistsPage from "./pages/ArtistsPage";
import ArtistDetailsPage from "./pages/ArtistDetailsPage";
import ProfilePageEditar from "./pages/ProfilePageEditar";
import EventosAsistirePage from "./pages/EventosAsistirePage";
import Footer from "./components/Footer";


function App() {

  return (
    <div className="bg-dark">
      <MyNavbar />

      <br />
      <hr />

      <Routes>
        {/* rutas de front */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/eventos" element={<EventosPage />} />
        <Route path="/eventos/:eventoId" element={<EventoDetailsPage />} />
        <Route path="/evento-crear" element={
          <Private>
            <CrearEvento />
          </Private>} />
        <Route path="/eventos/editar/:eventoId" element={
          <Private>
            <EventoEditarPage />
          </Private>
          } />
        <Route path="/artista-crear" element={<CrearArtista />} />
{/*         <Route path="/artistas" element={<ArtistasPage />} />
 */}        
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/artistas/:artistaId" element={<ArtistaDetailsPage />} />
        <Route path="/artists/:artistName" element={<ArtistDetailsPage />} />
        <Route path="/artistas/editar/:artistaId" element={<ArtistaEditarPage />} />
       
        <Route path="/profile-page" element={
          <Private>
            <ProfilePage />
          </Private>
          } />
           <Route path="/profile-page/editar" element={
          <Private>
            <ProfilePageEditar />
          </Private>
          
          } />
          
          <Route path="/mis-eventos" element={
          <Private>
            <EventosAsistirePage />
          </Private>
          
          } />
        {/* error FE routes here... */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer/>
    
    </div>
  )
}

export default App