import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import CohortFilterBar from "../components/CohortFilterBar";
//import CohortCard from "../components/CohortCard";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_SERVER_URL;

function ArtistasPage() {
  const [artistas, setArtistas] = useState([]);
  //const [campusQuery, setCampusQuery] = useState("");
  //const [programQuery, setProgramQuery] = useState("");

 /*  const handleChange = (event, updateState) => {
    updateState(event.target.value);
  }; */

/*   useEffect(() => {
    let queryString = "";
    if (campusQuery) queryString += `campus=${campusQuery}&`;
    if (programQuery) queryString += `program=${programQuery}`;

    axios
      .get(`${API_URL}/api/cohorts?${queryString}`)
      .then((response) => {
        setCohorts(response.data);
      })
      .catch((error) => console.log(error));
  }, [campusQuery, programQuery]);
 */
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

  return (
    <div className="">
 {/*      <CohortFilterBar
        campusQuery={campusQuery}
        setCampusQuery={setCampusQuery}
        programQuery={programQuery}
        setProgramQuery={setProgramQuery}
        handleChange={handleChange}
      /> */}

     {/*  <div className="flex justify-between items-center p-2 font-bold border-b">
        <span style={{ flexBasis: "25%" }}>Cohort</span>
        <span style={{ flexBasis: "15%" }}>Program</span>
        <span style={{ flexBasis: "15%" }}>Format</span>
        <span style={{ flexBasis: "15%" }}>Ongoing</span>
        <span style={{ flexBasis: "25%" }}>Id</span>
      </div> */}

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
