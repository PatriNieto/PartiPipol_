import { useState, useEffect, useCallback, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import BotonAsistencia from "../components/BotonAsistencia";


// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_SERVER_URL;

function EventoDetailsPage() {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  //variables para CRD comentarios
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");

  const { eventoId } = useParams();
  
  const { loggedUserId } = useContext(AuthContext)

  console.log(loggedUserId)
  const getEvento = useCallback(() => {
    axios
      .get(`${API_URL}/api/eventos/${eventoId}`)
      .then((response) => {
        const oneEvento = response.data;
        setEvento(oneEvento)
        setLoading(false)
      })
      .catch((error) => console.log(error))
      
  }, [eventoId]);

  //funcion getComentarios del evento
  const getComentarios = useCallback(() => {
    axios
      .get(`${API_URL}/api/comentarios/${eventoId}`)
      .then((response) => {
        setComentarios(response.data);
      })
      .catch((error) => console.log(error));
  }, [eventoId]);

  //llamada a post comentarios
  const token = localStorage.getItem("authToken");

const handleComentarioSubmit=(e)=>{
  e.preventDefault()

  //nos aseguramos que el comentario no esta vacio antes de enviar y no permitimos entrar en la llamada a
  if(!nuevoComentario.trim()){
    alert("Por favor, escribe un comentario antes de enviar")
    return
  }

  axios.post(`${API_URL}/api/comentarios/${eventoId}`,{comentario:nuevoComentario},{
    headers:{
      Authorization: `Bearer ${token}`}
  })
  .then((response)=>{
    setComentarios([...comentarios, response.data.data])
    //limpiamos el formulario
    setNuevoComentario("")
  })
  .catch((error)=>(
    console.log(error)
  ))
}

//funcion delete
const handleDeleteComentario = (comentarioId) =>{
  axios.delete(`${API_URL}/api/comentarios/${comentarioId}`,{
    headers:{
      Authorization: `Bearer ${token}`}
  })
  .then(()=>{
    getComentarios()
    //setComentarios(prevComentarios => prevComentarios.filter(comentario => comentario._id !== comentarioId));    
  })
  .catch((error)=> console.log(error))
}

  useEffect(() => {
    getEvento()
    getComentarios()
    setLoading(false)
  }, [eventoId, getEvento, getComentarios]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!evento) {
    return <div>No evento found</div>;
  }

  return (
    <div>
   
        {/* Evento details */}
        <div>
          {evento && (
            <>
              <h1 className="text-2xl font-semibold mb-4">
                {evento.nombre}
              </h1>
              <img src={evento.image} alt="imagen-evento" />
              <p>{evento.fecha}</p>
              <br />
              <p className="mb-2 border-b pb-2">
                <strong>Descripción:</strong> {evento.descripcion}
              </p>
              <p className="mb-2 border-b pb-2">
                <strong>Dirección:</strong> 
                <br />
                {evento.direccion.calle},
                {evento.direccion.ciudad}
              </p>

              {evento.artista ? (
                <div>
                   <p>
                  Artistas invitados:
                 </p> 
                 <p>
                  {evento.artista}
                </p>
                </div>
               
              ):(
                <p>
                Este evento no tiene artistas 
                </p>
              )}

              {evento.genero && (
                <p>
                  {evento.genero}
                </p>
              )}

              <p>Precio: {evento.precio}€</p>
              <p>Asistentes: {evento.asistentes.length}</p>

              <BotonAsistencia
              eventoId={eventoId}
              userId={loggedUserId}
              onToggleAsistencia={getEvento}
              />
            </>
          )}

          <br />
          
          {//rendimiento condicional
          
          evento.promoter === loggedUserId && ( // Verificamos si el loggedUserId es el promoter
              <Link to={`/eventos/editar/${eventoId}`}>
                <button>Editar evento</button>
              </Link>
            )}

         
         
        </div>

     

        {loading && <div>Loading...</div>}

{/*         -----------------------------------------------------seccion de comentarios
 */}
      <h2>Comentarios: </h2>
      <form 
      onSubmit={handleComentarioSubmit}>
{/*         solo se puede añadir un texto como comentario
 */}      
  <textarea 
  value={nuevoComentario}
  onChange={(e)=>setNuevoComentario(e.target.value)}
  placeholder="Escribe tu comentario..."
  />
  <button
  type="submit">
    Agregar Comentario
  </button>


  {/* ahora seccion donde se muestran los comentarios */}
  <div>
    {
      comentarios.map((comentario)=>(
        <div 
        key={comentario._id}>
          <p>escrito por {comentario.usuario.username}</p>
          <img 
          src={comentario.usuario.imagenDePerfil} 
          alt="user-pic"
          style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover",
            objectPosition: "center" }} />
          <p> {comentario.comentario}</p>
          {/* opcion borrar comentario para el usuario , render condicionado a que el usuario coincida*/
           
           comentario.usuario._id == loggedUserId && (
            <button
            type="button"
            onClick={()=>handleDeleteComentario(comentario._id)}>
              eliminar
            </button>
          ) 
          }
        </div>
      ))
    }
  </div>
 </form>
      </div>

  );
}

export default EventoDetailsPage;
