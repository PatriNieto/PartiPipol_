import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";



// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_SERVER_URL;

function ArtistaDetailsPage() {
  const [artista, setArtista] = useState(null);
 //const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDrawer, setShowDrawer] = useState(false);

  const { artistaId } = useParams();

  const getArtista = useCallback(() => {
    axios
      .get(`${API_URL}/api/artistas/${artistaId}`)
      .then((response) => {
        const oneArtista = response.data;
        setArtista(oneArtista);
      })
      .catch((error) => console.log(error));
  }, [artistaId]);

  /* const getEventos = useCallback(() => {
    axios
      .get(`${API_URL}/api/students/cohort/${cohortId}`)
      .then((response) => {
        const allStudents = response.data;
        setStudents(allStudents);
      })
      .catch((error) => console.log(error));
  }, [cohortId]); */

  useEffect(() => {
    getArtista();
    //getStudents();
    setLoading(false);
  }, [artistaId, getArtista, /* ,getEventos */]);

  return (
    <div>
      {/* Drawer */}
      {/* <div
className={`drawer transition-transform transform ${
       showDrawer ? "translate-x-0" : "translate-x-full"
     } fixed right-0 top-0 h-full bg-white shadow-md z-10`}
      >
        {cohort && showDrawer && (
          <StudentCreateForm
            cohortId={cohort._id}
            cohortName={cohort.cohortName}
            callback={() => {
              setShowDrawer(false);
              getStudents();
            }}
            closeCallback={() => setShowDrawer(false)}
          />
        )}
      </div> */}


    
        {/* Artista details */}
        <div>
          {artista && (
            <>
              <h1 className="text-2xl font-semibold mb-4">
                {artista.nombre}
              </h1>
              <br />
              <img src={artista.imagen} alt="" />
              <p className="mb-2 border-b pb-2">
                <strong>Biografía:</strong> {artista.biografia}
              </p>
              <p className="mb-2 border-b pb-2">
                <strong>Enlaces:</strong> 
                <br />
                {artista.enlaces.spotify}
                <br />
                {artista.enlaces.instagram}
              </p>


{/*   <div className="flex flex-col items-center gap-2 mt-6 w-2/3 mx-auto">
                <Link to={`/cohorts/edit/${cohortId}`} className="w-full">
                  <button
                    disabled={showDrawer}
                    className={`transition duration-300 ease-in-out text-white px-4 py-2 w-full rounded ${
                      showDrawer
                        ? "bg-gray-500 hover:bg-gray-500"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    Edit Cohort
                  </button>
                </Link>
         
              </div> */}
            </>
          )}

          <br />

          <Link
          to={`/artistas/editar/${artistaId}`}>
          <button>
            Editar artista
          </button>
          </Link>

     
         
        </div>

     

        {loading && <div>Loading...</div>}

      {/*   {students &&
          students.map((student) => (
            <StudentCard key={student._id} {...student} />
          ))} */}
      </div>

  );
}

export default ArtistaDetailsPage;
