import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
//import CohortFilterBar from "../components/CohortFilterBar";
//import CohortCard from "../components/CohortCard";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_SERVER_URL;

function ArtistasPage() {
  const [artistas, setArtistas] = useState([]);
  
  const getAllArtistas = () => {
    axios
      .get(`${API_URL}/api/artistas`)
      .then((response) => {
        setArtistas(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllArtistas();
  }, []);

  //buscar aartistas por nombre


  return (
    <div className="">
 {/*      <CohortFilterBar
        campusQuery={campusQuery}
        setCampusQuery={setCampusQuery}
        programQuery={programQuery}
        setProgramQuery={setProgramQuery}
        handleChange={handleChange}
      /> */}



      {artistas &&
        artistas.map(
          (artista, index) => (
            /*   <ArtistCard
                key={artista._id}
                {...artista}
                
              /> */
              <Link
              to={`/artistas/${artista._id}`}>
            <div>

              <h2>
                {artista.nombre}
              </h2>
              <p>{artista.biografia}</p>

              </div>

              </Link>
          )
        )}
    </div>
  );
}

export default ArtistasPage;
