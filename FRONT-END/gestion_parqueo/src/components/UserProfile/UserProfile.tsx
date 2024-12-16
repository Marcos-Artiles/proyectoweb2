import React, { useEffect, useState } from 'react';
import './UserProfile.css'; // Asegúrate de que la ruta sea correcta
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../backend/axiosClient'; // Asegúrate de que la ruta sea correcta

const UserProfile: React.FC = () => {
  const [correo, setCorreo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [plazaAsignada, setPlazaAsignada] = useState<string>('Sin plaza asignada'); // Estado inicial para la plaza asignada
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
          setError('No se ha encontrado el token de autenticación.');
          navigate('/login'); // Redirige al login si no hay token
          return;
        }

        const response = await axiosClient.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Aquí agregamos el token en el encabezado
          },
        });

        const userData = response.data.user;
        setCorreo(userData.email);
        setPlazaAsignada(userData.plaza ? userData.plaza.codigo_plaza : 'Sin plaza asignada'); // Obtener el código de la plaza
      } catch (error) {
        setError('Error al cargar el perfil del usuario.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        setError('No se encontró un token de sesión.');
        return;
      }
  
      // Enviar solicitud de cierre de sesión al backend
      await axiosClient.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Eliminar datos del almacenamiento local
      localStorage.removeItem('token');
      localStorage.removeItem('user');
  
      // Redirigir al usuario a la página de inicio
      navigate('/');
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
        const token = localStorage.getItem('token');

        if (!token) {
          setError('No se encontró un token de sesión.');
          return;
        }

        const payload = {
          correo,
          password,
        };

        // Enviar los datos al backend
        await axiosClient.put('/profile/update', payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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