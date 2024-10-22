
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import CohortFilterBar from "../components/CohortFilterBar";
//import CohortCard from "../components/CohortCard";



function ArtistsPage() {
  const [artists, setArtists] = useState([]);

  const getPopularArtists = () => {
    axios
      .get(`https://ws.audioscrobbler.com/2.0/?method=chart.getTopArtists&api_key=ca7b9b089da8af348829efb05cb36c40&format=json`)
      .then((response) => {
        setArtists(response.data.artists.artist);
        console.log(response.data.artists.artist)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPopularArtists();
  }, []);

  return (
    <div className="">


      <p>Artistas más populares:</p>
      {artists &&
        artists.map(
          (artist, index) => (
            /*   <ArtistCard
                key={artista._id}
                {...artista}
                
              /> */
              <Link
              key={index}
              to={`/artists/${artist.name}`}>
               <div>
              <h2>
                {artist.name}
              </h2>
              </div>
              </Link>
           
          )
        )}
    </div>
  );
}

export default ArtistsPage;
