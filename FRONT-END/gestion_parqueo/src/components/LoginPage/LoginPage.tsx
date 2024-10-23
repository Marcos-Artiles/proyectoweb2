import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Archivo de estilos CSS local
import axiosClient from '../../backend/conexion'; // Importa Axios configurado
import { AxiosError } from 'axios';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Hacer una solicitud POST al backend para iniciar sesión
      const response = await axiosClient.post('/api/login', { email, password });
      
      // Obtener el token del usuario si la autenticación fue exitosa
      const { token, user } = response.data;

      // Almacenar el token en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirigir al usuario según su rol o página principal
      if (user.role === 'admin') {
        navigate('/AdministratorPage');
      } else {
        navigate('/UserProfile');
      }
      
    } catch (error) {
      if (error instanceof AxiosError) {
        // Manejo de errores específico de Axios
        if (error.response && error.response.status === 401) {
          setErrorMessage('Credenciales incorrectas. Por favor, verifica tu correo y contraseña.');
        } else {
          setErrorMessage('Hubo un error al iniciar sesión. Intenta nuevamente.');
        }
        console.error('Error al iniciar sesión:', error);
      } else {
        // Manejo de errores genérico
        setErrorMessage('Hubo un error inesperado. Intenta nuevamente.');
        console.error('Error inesperado:', error);
      }
    }
  };

  return (
    <div className="LoginPage">
      <header>
        <div className="contenedor_nav">
          <nav>
            <ul>
              <li><a href="/">Inicio</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="main-container">
        <div className="login-container">
          <h2>Iniciar Sesión</h2>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="correo">Correo:</label>
              <input
                type="text"
                id="correo"
                name="correo"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
      </div>

      <footer>
        <p>© Grupo 8. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LoginPage;