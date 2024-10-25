
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
//import CohortFilterBar from "../components/CohortFilterBar";
//import CohortCard from "../components/CohortCard";



function ArtistsPage() {
  const [artists, setArtists] = useState([]);

  //creamos variable para las busquedas
  const [nombreQuery, setNombreQuery ] = useState("")
  const [filteredArtists, setFilteredArtists ] = useState([])

  //pasamos la api key la backend - Git Guardian
  //!me fallaba la llamada escondiendo la key, revisar esto
  const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
  
  const getPopularArtists = () => {
    axios.get(`https://ws.audioscrobbler.com/2.0/?method=chart.getTopArtists&artist=${nombreQuery}&api_key=ca7b9b089da8af348829efb05cb36c40&format=json`)
    .then((response) => {
        setArtists(response.data.artists.artist);
        console.log(response.data.artists.artist)
        console.log("API Key:", apiKey);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPopularArtists();
  }, []);

  //creamos otro useEffect para cuando se cambie la busqueda
  useEffect(()=>{
    if(nombreQuery.trim()){
      // const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/artists/search?artist=${artistName}`);
      axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${nombreQuery}&api_key=ca7b9b089da8af348829efb05cb36c40&format=json`)
      .then((response)=>{
        //esto nos viene de la API
        const artists = response.data.results.artistmatches.artist
        console.log("Response from artist search:", response.data);
        setFilteredArtists(artists)
      })
      .catch((error)=>{
        console.log(error)
        //si hay error limipamos?
        //setFilteredArtists([])
      })

    } else {
      setFilteredArtists([])
    }
  }, [nombreQuery])

  return (
    <div className="container text-light">
        <div className="sticky-top bg-dark p-3">

      <h2>Buscar artista:</h2>

<SearchBar
nombreQuery= {nombreQuery}
setNombreQuery={setNombreQuery}
placeholder={"Introduce el nombre de un artista..."}
/>
</div>
{filteredArtists.length > 0 && (
      <div
      className="min-vh-100">
        Resultados:
        {filteredArtists.slice(0,5).map((artist, index) => (
          <Link key={index} 
          className="text-light"
          to={`/artists/${artist.name}`}>
            <div>
              <h4>{artist.name}</h4>
            </div>
          </Link>
        ))}
      </div>
    )}
<hr />
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
