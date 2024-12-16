import React, { useEffect, useState } from 'react';
import './UserProfile.css'; // Asegúrate de que la ruta sea correcta
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../backend/axiosClient'; // Asegúrate de que la ruta sea correcta

const UserProfile: React.FC = () => {
  const [correo, setCorreo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [plazaAsignada, setPlazaAsignada] = useState<string>(''); // Estado para la plaza asignada
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // Hook para navegar a otras rutas

  // Usamos useEffect para cargar el perfil del usuario desde el backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('No se ha encontrado el token de autenticación');
          return;
        }

        const response = await axiosClient.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Aquí agregamos el token en el encabezado
          },
        });
        
        setCorreo(response.data.user.email);
        setPlazaAsignada(response.data.user.plaza ? response.data.user.plaza.codigo_plaza : 'Sin plaza asignada');
      } catch (error) {
        setError('Error al cargar el perfil del usuario.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await axiosClient.post('/logout'); // Llamada a la función logout del backend
      localStorage.removeItem('token'); // Remover el token del localStorage
      navigate('/'); // Redirigir a la página de inicio
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      setError('Error al cerrar sesión.');
    }
  };

  // Función para manejar el envío del formulario y actualizar los datos en el backend
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    if (validateForm()) {
      try {
        setLoading(true);
        const payload = {
          correo,
          password,
          plaza: plazaAsignada, // Actualizar la plaza asignada si es necesario
        };
        // Enviar los datos al backend
        await axiosClient.put('/profile/update', payload);
        alert("Datos actualizados con éxito.");
      } catch (error) {
        setError("Error al actualizar los datos.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Validar el formulario antes de enviar
  const validateForm = (): boolean => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return false;
    }
    return true;
  };

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="perfil-container">
          <header>
            <nav>
              <ul>
                <li>
                  <button onClick={handleLogout}>Cerrar Sesión</button> {/* Botón para cerrar sesión */}
                </li>
              </ul>
            </nav>
          </header>

          <h2>Perfil de Usuario</h2>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="correo">Correo:</label>
              <input
                type="text"
                id="correo"
                name="correo"
                value={correo}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Actualizar Datos</button>
          </form>
        </div>
      )}

      <div className="additional-info">
        <div>
          <h3>Plaza Asignada:</h3>
          <p>{plazaAsignada}</p> {/* Mostrar la plaza asignada */}
        </div>
        <div>
          <button><Link to="/SoportePage">Soporte</Link></button>
        </div>
      </div>

      <footer>
        <p>© Grupo 8 Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default UserProfile;