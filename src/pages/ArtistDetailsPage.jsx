import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function ArtistDetailsPage() {

  const {artistName} = useParams();
  const [artist, setArtist] = useState(null)
  //añadimos variable de control de carga
  const [loading, setLoading] = useState(true);
  const [eventos , setEventos] = useState([]);
  const [nombreQuery, setNombreQuery] = useState("");

  const API_URL = import.meta.env.VITE_SERVER_URL;


  //hacemos llamada a Lastfm para obtener los datos del artista a traves del nombre
  useEffect(()=>{
    axios
    .get(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=ca7b9b089da8af348829efb05cb36c40&format=json`)
    .then((response)=>{
      setArtist(response.data.artist)
      console.log(response.data.artist)
      setLoading(false)
    })
    .catch((error)=>{
      console.log(error)
      setLoading(false)
    })
  }, [artistName])

  //llamada eventos artista
    //llamada cuando cambian los parámetros de busqueda de la barra de filtrado:
useEffect(() => {
  if(artistName){
  let queryString = "";
  if (artistName) queryString += `nombre=${artistName}`;

  // Realiza la solicitud con la cadena de consulta construida
  axios
    .get(`${API_URL}/api/eventos?${queryString}`)
    .then((response) => {
      setEventos(response.data);
      console.log(response.data)
    })
    .catch((error) => console.log(error));} else {
      setEventos([])
    }
}, [artistName]);

  //cargando
  if(!artist){
    return
    <p>Cargando datos del artista...</p>
  }

  //cargando
  if(loading){
    return
    <p>...loading</p>
  }

  return (
    
<>

    <div>{artist.name}</div>
   {/*  //la api no tiene buenos enlaces para esto
    <img src={artist.image[1][`#text`]} alt="artist-pic-1" /> */}
    <div>Oyentes totales: {artist.stats.listeners}</div>

{/*     
este dato contienen un enlace que se queda en texto, he mirado opciones pero todas son peligrosas 
por las inyecciones de html asique busco < y corto
 */}    
 <div>{artist.bio.summary.slice(0,(artist.bio.summary.indexOf('<')))}</div>
   
   {
    artist.ontour === "1" ?
    <p>Actualmente de gira</p>
    : <p>El artista no está de gira</p>
   }

{
  eventos.length > 0 ?
  (
    <div>
    Eventos programados:
    {eventos.map((evento, index)=>
    <Link
    key={index}
    to={`/eventos/${evento._id}`}
    >
     <div
     key={index}>
        {evento.nombre}
      </div>
    </Link>
     
    )}
    </div>
  ):(
    <p>Este artista no tiene eventos programados</p>
  )
}


{artist.similar.artist.length > 0 ?
( <div>
 Artistas similares: 
 {artist.similar.artist.map((element, index)=>(
   <Link
    key={index}
    to={`/artists/${element.name}`}
    >
              
    <div>
     {element.name}
    </div>
   </Link>
 ))}
</div>) : (
  <p>Este artista es tan especial que no tiene artistas similares</p>
)
}
   
</>
    
  )
}

export default ArtistDetailsPage

/*

*/