import React, { useState, useEffect } from 'react';
import './AsignarPlazaPage.css'; // Asegúrate de que la ruta sea correcta para tu archivo CSS
import { Link } from 'react-router-dom';
import axiosClient from '../../backend/axiosClient'; // Asegúrate de que la ruta sea correcta

const AsignarPlazaPage: React.FC = () => {
  const [matricula, setMatricula] = useState('');
  const [plaza, setPlaza] = useState('');
  const [plazaId, setPlazaId] = useState(''); // Estado para la plaza a borrar o actualizar
  const [codigoPlaza, setCodigoPlaza] = useState(''); // Estado para la nueva plaza a crear o actualizar
  const [disponibilidad, setDisponibilidad] = useState(false); // Estado para actualizar disponibilidad
  const [message, setMessage] = useState('');
  const [plazasDisponibles, setPlazasDisponibles] = useState<any[]>([]);

  // Obtener las plazas disponibles desde el backend
  useEffect(() => {
    const fetchPlazasDisponibles = async () => {
      try {
        await axiosClient.get('/sanctum/csrf-cookie'); // Solicita el token CSRF
        const response = await axiosClient.get('/plazas');
        setPlazasDisponibles(response.data); // Asignar las plazas disponibles
      } catch (error) {
        console.error('Error al obtener las plazas:', error);
      }
    };

    fetchPlazasDisponibles();
  }, []); // Cargar las plazas disponibles al iniciar

  const handleAsignarPlaza = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axiosClient.get('/sanctum/csrf-cookie'); // Solicita el token CSRF
      const response = await axiosClient.put('/asignar-plaza', { matricula, plaza });
      setMessage(`Plaza ${plaza} asignada correctamente.`);
      setMatricula('');
      setPlaza('');
    } catch (error: any) {
      setMessage(`Error: ${error.response?.data.message || 'No se pudo asignar la plaza'}`);
    }
  };

  const handleCrearPlaza = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axiosClient.get('/sanctum/csrf-cookie'); // Solicita el token CSRF
      const response = await axiosClient.post('/plazas', { codigo_plaza: codigoPlaza });
      setMessage(`Plaza ${codigoPlaza} creada con éxito.`);
      setCodigoPlaza('');
    } catch (error: any) {
      setMessage(`Error: ${error.response?.data.message || 'No se pudo crear la plaza'}`);
    }
  };

  const handleBorrarPlaza = async () => {
    try {
      await axiosClient.get('/sanctum/csrf-cookie'); // Solicita el token CSRF
      const response = await axiosClient.delete(`/plazas/${plazaId}`);
      setMessage(`Plaza con ID ${plazaId} eliminada con éxito.`);
      setPlazaId('');
    } catch (error: any) {
      setMessage(`Error: ${error.response?.data.message || 'No se pudo eliminar la plaza'}`);
    }
  };

  const handleActualizarPlaza = async () => {
    try {
      await axiosClient.get('/sanctum/csrf-cookie'); // Solicita el token CSRF
      const response = await axiosClient.put(`/plaza/${plazaId}`, { codigo_plaza: codigoPlaza });
      setMessage(`Plaza con ID ${plazaId} actualizada correctamente.`);
      setPlazaId('');
      setCodigoPlaza('');
    } catch (error: any) {
      setMessage(`Error: ${error.response?.data.message || 'No se pudo actualizar la plaza'}`);
    }
  };

  const handleActualizarDisponibilidad = async () => {
    try {
      await axiosClient.get('/sanctum/csrf-cookie'); // Solicita el token CSRF
      const response = await axiosClient.put(`/plaza/${plazaId}/disponibilidad`, { disponible: disponibilidad });
      setMessage(`Disponibilidad de plaza con ID ${plazaId} actualizada.`);
      setPlazaId('');
    } catch (error: any) {
      setMessage(`Error: ${error.response?.data.message || 'No se pudo actualizar la disponibilidad'}`);
    }
  };

  const handleReiniciarPlazas = async () => {
    try {
      await axiosClient.get('/sanctum/csrf-cookie'); // Solicita el token CSRF
      const response = await axiosClient.post('/reset-plazas', {});
      setMessage(`Estado de todas las plazas reiniciado.`);
    } catch (error: any) {
      setMessage(`Error: ${error.response?.data.message || 'No se pudo reiniciar las plazas'}`);
    }
  };

  return (
    <div className="AsignarPlazaPage">
      <header>
        <nav>
          <ul>
            <li><Link to="/AdministratorPage">Regresar</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="plaza-form">
          <h1>Administrar Plazas</h1>

          {/* Formulario para asignar plaza */}
          <h2>Asignar Plaza</h2>
          <form onSubmit={handleAsignarPlaza}>
            <div className="form-group">
              <label htmlFor="matricula">Matrícula:</label>
              <input
                type="text"
                id="matricula"
                name="matricula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="plaza">Plaza:</label>
              <input
                type="text"
                id="plaza"
                name="plaza"
                value={plaza}
                onChange={(e) => setPlaza(e.target.value)}
                required
              />
            </div>
            <button type="submit">Asignar Plaza</button>
          </form>

          {/* Formulario para crear plaza */}
          <h2>Crear Plaza</h2>
          <form onSubmit={handleCrearPlaza}>
            <div className="form-group">
              <label htmlFor="codigoPlaza">Código de Plaza:</label>
              <input
                type="text"
                id="codigoPlaza"
                name="codigoPlaza"
                value={codigoPlaza}
                onChange={(e) => setCodigoPlaza(e.target.value)}
                required
              />
            </div>
            <button type="submit">Crear Plaza</button>
          </form>

          {/* Formulario para borrar plaza */}
          <h2>Borrar Plaza</h2>
          <div className="form-group">
            <label htmlFor="plazaId">ID de Plaza a Borrar:</label>
            <input
              type="text"
              id="plazaId"
              value={plazaId}
              onChange={(e) => setPlazaId(e.target.value)}
              required
            />
          </div>
          <button onClick={handleBorrarPlaza}>Borrar Plaza</button>

          {/* Formulario para actualizar plaza */}
          <h2>Actualizar Plaza</h2>
          <div className="form-group">
            <label htmlFor="plazaIdUpdate">ID de Plaza a Actualizar:</label>
            <input
              type="text"
              id="plazaIdUpdate"
              value={plazaId}
              onChange={(e) => setPlazaId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="codigoPlazaUpdate">Nuevo Código de Plaza:</label>
            <input
              type="text"
              id="codigoPlazaUpdate"
              value={codigoPlaza}
              onChange={(e) => setCodigoPlaza(e.target.value)}
              required
            />
          </div>
          <button onClick={handleActualizarPlaza}>Actualizar Plaza</button>

          {/* Formulario para actualizar disponibilidad */}
          <h2>Actualizar Disponibilidad de Plaza</h2>
          <div className="form-group">
            <label htmlFor="plazaIdDisponibilidad">ID de Plaza a Actualizar Disponibilidad:</label>
            <input
              type="text"
              id="plazaIdDisponibilidad"
              value={plazaId}
              onChange={(e) => setPlazaId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="disponibilidad">Disponibilidad:</label>
            <select
              id="disponibilidad"
              value={disponibilidad ? 'true' : 'false'}
              onChange={(e) => setDisponibilidad(e.target.value === 'true')}
            >
              <option value="true">Disponible</option>
              <option value="false">No Disponible</option>
            </select>
          </div>
          <button onClick={handleActualizarDisponibilidad}>Actualizar Disponibilidad</button>

          {/* Botón para reiniciar estado de todas las plazas */}
          <h2>Reiniciar Estado de Plazas</h2>
          <button onClick={handleReiniciarPlazas}>Reiniciar Estado</button>

          {message && <p>{message}</p>}
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Grupo 8, Web 2. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default AsignarPlazaPage;