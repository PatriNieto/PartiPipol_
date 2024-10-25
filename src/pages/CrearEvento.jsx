import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/CrearEvento.css"



// Conexión a la base de datos
const API_URL = import.meta.env.VITE_SERVER_URL;


// Definimos las propiedades que tendrá un evento
const DEFAULT_EVENTO_FORM_VALUES = {
  nombre: "",
  fecha: "",
  direccion: {
    calle: "",
    ciudad: "",
  },
  artista: "",
  genero: "",
  descripcion: "",
  precio: 0,
  promoter: "",
  image:""
};

function CrearEvento({ artistaNombre}) {
  const navigate = useNavigate();

  // Inicializamos el evento con todas sus propiedades vacías
  const [evento, setEvento] = useState({ ...DEFAULT_EVENTO_FORM_VALUES });

  //artistas tendrán un manejo especial, los buscaremos directamente en la API de Lastfm
  const [artistSearch, setArtistSearch] = useState('');
  const [artistResults, setArtistResults] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");



// below state will hold the image URL from cloudinary. This will come from the backend.
const [imageUrl, setImageUrl] = useState(null); 
const [isUploading, setIsUploading] = useState(false); // for a loading animation effect

  // add to component where you are creating an item

// below function should be the only function invoked when the file type input changes => onChange={handleFileUpload}
const handleFileUpload = async (event) => {
  // console.log("The file to be uploaded is: ", e.target.files[0]);

  if (!event.target.files[0]) {
    // to prevent accidentally clicking the choose file button and not selecting a file
    return;
  }

  setIsUploading(true); // to start the loading animation

  const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
  uploadData.append("image", event.target.files[0]);
  //                   |
  //     this name needs to match the name used in the middleware in the backend => uploader.single("image")

  try {
    const response = await axios.post(`${API_URL}/api/upload/imagen-evento`, uploadData)
    // !IMPORTANT: Adapt the request structure to the one in your proyect (services, .env, auth, etc...)

    setImageUrl(response.data.imageUrl);
    //                          |
    //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

    setIsUploading(false); // to stop the loading animation
  } catch (error) {
    navigate("/error");
  }
};

const handleFechaChange = (event) => {
  const fechaDate = event.target.value;
  setEvento((prevEvento) => ({
    ...prevEvento,
    fecha: fechaDate,
  }));
};


//toast de bootstrap react
const [showToast, setShowToast] = useState(false);

  // Ejecución al enviar formulario de creación de evento
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;  
    setSubmitting(true);

    const token = localStorage.getItem("authToken");

    const eventoData = { ...evento,image: imageUrl  };

    // Si el artista está vacío, no lo incluimos en el objeto que se enviará
    if (eventoData.artista === '') {
      delete eventoData.artista; // Eliminar el campo artista si está vacío
    }

    console.log(eventoData); 
    // Hacemos llamada POST al servidor en la dirección
    axios
      .post(`${API_URL}/api/eventos/evento`, eventoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        let message = ("Evento creado.")
        setShowToast(true);
      
        setEvento({ ...DEFAULT_EVENTO_FORM_VALUES, artista: artistaNombre });
        setSubmitting(false);
        navigate("/eventos");
      })
      .catch((error) => {
        console.log(error);
        const message = error.response?.data?.message || "Error al crear el evento.";
        setErrorMessage(message);
        setShowToast(true);
        setSubmitting(false);
      });
  };

  const handleArtistSearch = async (artistName) => {
    if (!artistName) {
      setArtistResults([]); // Limpiar resultados si no hay entrada
      return;
    }
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/artists/search?artist=${artistName}`);

      const artists = response.data; 
      //limitamos el numero de resultados haciendo un slice sobre el resultado total
      setArtistResults(artists.slice(0, 5)); 
    } catch (error) {
      console.error("Error fetching artist search results:", error);
    }
  };


  const handleArtistSelect = (artist) => {
    setEvento((prevEvento) => ({
      ...prevEvento,
      artista: artist.name, // Asignar el nombre del artista seleccionado
    }));
    setArtistSearch(artist.name); // Actualizar el input con el nombre del artista seleccionado
    setArtistResults([]); // Limpiar los resultados
  };
  

  // Gestionar el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "precio" && Number(value) < 0) {
      alert("El precio debe ser mayor de 0");
      return; // Detenemos la actualización si el valor no es válido
    }

    // Solo tenemos un caso especial en calle y ciudad que componen dirección
    if (name === "calle" || name === "ciudad") {
      setEvento((prevEvento) => ({
        ...prevEvento,
        direccion: {
          ...prevEvento.direccion,
          [name]: value,
        },
      }));
    } else {
      setEvento((prevEvento) => ({
        ...prevEvento,
        [name]: value,
      }));
    }
  };

  //validacion front en el envio de formulario:
  const validateForm = () => {
    const { nombre, fecha, direccion, descripcion, precio } = evento;
    if (!nombre || !fecha || !direccion.calle || !direccion.ciudad || !descripcion || precio <= 0) {
      setErrorMessage("Los campos marcados con (*) son obligatorios y el precio debe ser mayor que 0.");
      setMessage("Los campos marcados con (*) son obligatorios y el precio debe ser mayor que 0.");

      setShowToast(true)
      return false;
    }
    return true;
  };




  return (

  <div className="row justify-content-center d-flex align-items-center m-0 min-vh-100">
    <div 
    id="container-crear-evento"
    className="text-light col-12 col-md-8 col-lg-10 m-0 overflow-hidden">
      <h3>
      Crea tu Evento
      </h3>

      <form onSubmit={handleSubmit}>
        <label>Nombre del Evento(*):</label>
        <input
          type="text"
          name="nombre"
          value={evento.nombre}
          onChange={handleChange}
        />

        <br />

        <label>Fecha del evento(*):</label>
        <input 
          type="date" 
        // Convertir a string ISO para el campo de fecha - solucion consultada para el manejo de fechas
          onChange={handleFechaChange} 
        />

        <br />  
        <h6
        className="mt-3">Dirección del evento:</h6>
        <label>Calle(*):</label>
        <input
          type="text"
          name="calle"
          value={evento.direccion.calle}
          onChange={handleChange}
        />
       <label>Ciudad(*):</label>
        <select
          name="ciudad"
          value={evento.direccion.ciudad}
          onChange={handleChange}
        >
          <option value="">Selecciona una ciudad</option>
          <option value="Madrid">Madrid</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Bilbao">Bilbao</option>
          <option value="Valencia">Valencia</option>
          <option value="Málaga">Málaga</option>
          <option value="otra">Otra</option>
        </select>


        <br />

                <div
                className="mt-3">
                  <p>Artista invitado:</p>
          <input 
            type="text" 
            value={artistSearch} 
            onChange={(e) => {
              const searchValue = e.target.value;
              setArtistSearch(searchValue); 
              //llama a la funcion de busqueda
              handleArtistSearch(searchValue);
            }} 
            placeholder="Buscar artista..."
          />
          <ul>
            {//mostramos los posibles resultados
            artistResults.map((artist) => (
              <li key={artist.name} onClick={() => handleArtistSelect(artist)}>
                {artist.name}
              </li>
            ))}
          </ul>
        </div>

        <br />

        <label>Género:</label>
        <select
          name="genero"
          value={evento.genero}
          onChange={handleChange}
        >
          <option value="">Selecciona un género</option>
          <option value="Electronica">Electrónica</option>
          <option value="Jazz">Jazz</option>
          <option value="Rock">Rock</option>
          <option value="Pop">Pop</option>
          <option value="Latina">Latina</option>
        </select>

        <br />
        <label>Descripción(*):</label>
        <input
        className=""
          type="text"
          name="descripcion"
          value={evento.descripcion}
          onChange={handleChange}
        />



  <label>Subir imágen: </label>
  <input

  className="mb-3 overflow-hidden cloud"
    type="file"
    name="image"
    onChange={handleFileUpload}
    disabled={isUploading}
  />
  {/* below disabled prevents the user from attempting another upload while one is already happening */}


{/* to render a loading message or spinner while uploading the picture */}
{isUploading ? <h3>... uploading image</h3> : null}

{/* below line will render a preview of the image from cloudinary */}
{imageUrl ? (<div><img src={imageUrl} alt="img" width={200} /></div>) : null}

        <br />
        <label>Precio(*):</label>
        <input
        className="mb-5"
          type="number"
          name="precio"
          value={evento.precio}
          onChange={handleChange}
        />

        <br />
        <Toast
            position="middle-center"
            className="bg-light text-dark w-100"
              show={showToast}
              onClose={() => setShowToast(false)}
              delay={3000}
              autohide
            >
              <Toast.Body>{message}</Toast.Body>
            </Toast>
<div
className="d-flex justify-content-center">
  
<button 
        className="m-3"
        type="submit">Crear Evento</button>

</div>
<Link
to={"/"}>
<div
className="d-flex justify-content-center">
<button 
        className="m-3"
        >Cancelar</button>

</div>
</Link>

       

     

       {/*  {errorMessage && <p>{errorMessage}</p>}  */}
      </form>
           
    </div>
    </div>


  );
}

export default CrearEvento;
