import React, { useEffect, useState } from 'react';
import './UserProfile.css'; // Importa el archivo de estilos CSS local
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from "../../backend/conexion"; // Asegúrate de que la ruta a `conexion.js` sea correcta.

const UserProfile: React.FC = () => {
  const [correo, setCorreo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [matricula, setMatricula] = useState<string>('');
  const [colorCarro, setColorCarro] = useState<string>('');
  const [plazaAsignada, setPlazaAsignada] = useState<string>(''); // Estado para la plaza asignada
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // Hook para navegar a otras rutas

  // Usamos useEffect para cargar el perfil del usuario desde el backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get('/profile');
        const data = response.data;

        setCorreo(data.correo);
        setPassword(data.password);
        setConfirmPassword(data.password); // Confirmar contraseña por defecto
        setMatricula(data.matricula);
        setColorCarro(data.colorCarro);
        setPlazaAsignada(data.plaza || ''); // Asignar plaza si existe
      } catch (error) {
        setError("Error al cargar el perfil del usuario.");
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
          matricula,
          colorCarro,
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
    const lettersOnly: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (!lettersOnly.test(colorCarro)) {
      alert("El campo Color del Carro solo puede contener letras.");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return false;
    }

    return true;
  };

  // Aquí defines plazasDisponibles como una lista de ejemplo
  const plazasDisponibles: string[] = ["A-1", "B-2", "C-8"];

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
                  <button onClick={handleLogout}>Inicio</button> {/* Botón que llama a handleLogout */}
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
              <label htmlFor="colorCarro">Color del Carro:</label>
              <input
                type="text"
                id="colorCarro"
                name="colorCarro"
                value={colorCarro}
                onChange={(e) => setColorCarro(e.target.value)}
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

      {/* Nuevo div para mostrar las plazas disponibles */}
      <div className="plazas-disponibles">
        <h2>Plazas Disponibles</h2>
        <ul>
          {plazasDisponibles.map((plaza, index) => (
            <li key={index}>{plaza}</li>
          ))}
        </ul>
      </div>

      <footer>
        <p>© Grupo 8 Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default UserProfile;