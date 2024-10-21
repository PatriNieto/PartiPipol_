
import { Link } from "react-router-dom";

//implementación filtros por genero o por ciudad
function FilterEventoBar({
  ciudadQuery,
  setCiudadQuery,
  generoQuery,
  setGeneroQuery,
  handleChange,
}) {
  return  (
    <div>
      <div>
        <label htmlFor="ciudad" className="flex items-center">
          <span className="mr-2">Ciudad:</span>
          <select
            name="ciudad"
            id="ciudad"
            value={ciudadQuery}
            onChange={(e) => handleChange(e, setCiudadQuery)}
            className="p-1"
          >
            <option value="">All</option>
            <option value="Madrid">Madrid</option>
            <option value="Barcelona">Barcelona</option>
            <option value="Bilbao">Bilbao</option>
            <option value="Valencia">Valencia</option>
            <option value="Malaga">Málaga</option>
            <option value="otra">otra ciudad</option>
          </select>
        </label>

        <label htmlFor="genero" className="flex items-center">
          <span className="mr-2">Género:</span>
          <select
            name="genero"
            id="genero"
            value={generoQuery}
            onChange={(e) => handleChange(e, setGeneroQuery)}
            className="p-1"
          >
            <option value="">All</option>
            <option value="Electronica">Electronica</option>
            <option value="Jazz">Jazz</option>
            <option value="Rock">Rock</option>
            <option value="Pop">Pop</option>
            <option value="Latina">Latina</option>
          </select>
        </label>
      </div>

    
    </div>
  );
}

export default FilterEventoBar;
