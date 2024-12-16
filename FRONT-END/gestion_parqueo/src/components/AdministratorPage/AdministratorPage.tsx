import React, { useState, useEffect } from 'react';
import './AdministratorPage.css'; // Asegúrate de que la ruta sea correcta para tu archivo CSS
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../backend/axiosClient';

const AdministratorPage: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<any[]>([]); // Solicitudes de soporte
  const [plazas, setPlazas] = useState<any[]>([]); // Plazas disponibles
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No se encontró un token de sesión.');
        navigate('/');
        return;
      }

      // Llamada al backend para cerrar sesión
      await axiosClient.post('/logout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remover el token y los datos del usuario del localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Redirigir a la página de inicio
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      setError('Error al cerrar sesión.');
    }
  };

  // Cargar solicitudes de soporte desde el backend
  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No se encontró un token de sesión.');
          navigate('/'); // Redirigir a inicio si no hay token
          return;
        }

        const response = await axiosClient.get('/soporte', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSolicitudes(response.data.soportes || []);
      } catch (error) {
        setError('Error al cargar las solicitudes de soporte.');
        console.error(error);
      }
    };

    fetchSolicitudes();
  }, [navigate]);

  // Cargar plazas disponibles desde el backend
  useEffect(() => {
    const fetchPlazas = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No se encontró un token de sesión.');
          navigate('/');
          return;
        }

        const response = await axiosClient.get('/plazas', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlazas(response.data || []);
      } catch (error) {
        setError('Error al cargar las plazas.');
        console.error(error);
      }
    };

    fetchPlazas();
  }, [navigate]);

  return (
    <div className="AdministratorPage">
      <header>
        <nav>
          <ul>
            <li>
              {/* Vincular el botón Inicio a handleLogout */}
              <button onClick={handleLogout}>Inicio</button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="admin-buttons">
          <button><Link to="/GenerarReportesPage">Generar Reporte</Link></button>
          <button><Link to="/AsignarPlazasPage">Administrar Plazas</Link></button>
          <button><Link to="/PlazasPage">Verificar Plazas</Link></button>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="solicitudes-container">
          <h2>Solicitudes de Soporte</h2>
          {solicitudes.length > 0 ? (
            <ul className="solicitudes-list">
              {solicitudes.map((solicitud) => (
                <li key={solicitud.id} className="solicitud-item">
                  <p><strong>Usuario:</strong> {solicitud.user.name}</p>
                  <p><strong>Correo:</strong> {solicitud.user.email}</p>
                  <p><strong>Mensaje:</strong> {solicitud.mensaje}</p>
                  <p><strong>Estado:</strong> {solicitud.atendido ? 'Atendido' : 'Pendiente'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay solicitudes pendientes.</p>
          )}
        </div>

        <div className="plazas-container">
          <h2>Plazas Disponibles</h2>
          {plazas.length > 0 ? (
            <ul className="plazas-list">
              {plazas.map((plaza) => (
                <li key={plaza.id} className="plaza-item">
                  <p><strong>Código:</strong> {plaza.codigo_plaza}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay plazas disponibles.</p>
          )}
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Grupo 8, Web 2. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default AdministratorPage;