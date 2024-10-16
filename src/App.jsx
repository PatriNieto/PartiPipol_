import "./App.css";
import { Routes, Route } from "react-router";




// components
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

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
        <Route path="/private-page-example" element={<ProfilePage />} />

        {/* error FE routes here... */}

      </Routes>
    </div>
  )
}

export default App