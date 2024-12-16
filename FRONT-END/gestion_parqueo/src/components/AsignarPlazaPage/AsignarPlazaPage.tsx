import React, { useState, useEffect } from 'react';
import './AsignarPlazaPage.css';
import { Link } from 'react-router-dom';
import axiosClient from '../../backend/axiosClient';

const AsignarPlazaPage: React.FC = () => {
  const [correo, setCorreo] = useState(''); // Cambiado de matricula a correo
  const [plaza, setPlaza] = useState('');
  const [plazaId, setPlazaId] = useState('');
  const [codigoPlaza, setCodigoPlaza] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(false);
  const [message, setMessage] = useState('');
  const [plazasDisponibles, setPlazasDisponibles] = useState<any[]>([]);

    // Obtener plazas disponibles al cargar la página
    useEffect(() => {
      const fetchPlazasDisponibles = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            setMessage('No se encontró el token de autenticación.');
            return;
          }
  
          const response = await axiosClient.get('/plazas', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setPlazasDisponibles(response.data);
        } catch (error: any) {
          console.error('Error al obtener las plazas:', error);
          setMessage('Error al cargar las plazas disponibles.');
        }
      };
  
      fetchPlazasDisponibles();
    }, []);

    const handleAsignarPlaza = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
    
        const payload = { email: correo, codigo_plaza: plaza }; // Ajusta el payload
        const response = await axiosClient.put('/asignar-plaza', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        setMessage(`Plaza ${plaza} asignada correctamente.`);
        setCorreo('');
        setPlaza('');
      } catch (error: any) {
        console.error('Error al asignar plaza:', error);
        setMessage(`Error: ${error.response?.data.message || 'No se pudo asignar la plaza.'}`);
      }
    };

  // Crear una nueva plaza
  const handleCrearPlaza = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axiosClient.post(
        '/plazas',
        { codigo_plaza: codigoPlaza },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(`Plaza ${codigoPlaza} creada con éxito.`);
      setCodigoPlaza('');
    } catch (error: any) {
      console.error(error);
      setMessage(`Error: ${error.response?.data.message || 'No se pudo crear la plaza.'}`);
    }
  };

  const handleBorrarPlaza = async () => {
    try {
      await axiosClient.get('/sanctum/csrf-cookie'); // Solicita el token CSRF
  
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Token de autenticación no encontrado.');
        return;
      }
  
      // Realizar la solicitud DELETE con el token CSRF
      const response = await axiosClient.delete(`/plazas/${plazaId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Asegúrate de enviar el token de autenticación
        },
      });
  
      setMessage(`Plaza con ID ${plazaId} eliminada con éxito.`);
      setPlazaId('');
    } catch (error: any) {
      console.error('Error al borrar plaza:', error);
      setMessage(`Error: ${error.response?.data.message || 'No se pudo eliminar la plaza.'}`);
    }
  };

  // Actualizar una plaza
  const handleActualizarPlaza = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axiosClient.put(
        `/plaza/${plazaId}`,
        { codigo_plaza: codigoPlaza },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(`Plaza con ID ${plazaId} actualizada correctamente.`);
      setPlazaId('');
      setCodigoPlaza('');
    } catch (error: any) {
      console.error(error);
      setMessage(`Error: ${error.response?.data.message || 'No se pudo actualizar la plaza.'}`);
    }
  };

  // Actualizar disponibilidad de una plaza
  const handleActualizarDisponibilidad = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axiosClient.put(
        `/plaza/${plazaId}/disponibilidad`,
        { disponible: disponibilidad },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(`Disponibilidad de plaza con ID ${plazaId} actualizada.`);
      setPlazaId('');
    } catch (error: any) {
      console.error(error);
      setMessage(`Error: ${error.response?.data.message || 'No se pudo actualizar la disponibilidad.'}`);
    }
  };

  // Reiniciar todas las plazas
  const handleReiniciarPlazas = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axiosClient.post(
        '/reset-plazas',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Estado de todas las plazas reiniciado.');
    } catch (error: any) {
      console.error(error);
      setMessage(`Error: ${error.response?.data.message || 'No se pudo reiniciar las plazas.'}`);
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
              <label htmlFor="correo">Correo:</label>
              <input
                type="text"
                id="correo"
                name="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
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