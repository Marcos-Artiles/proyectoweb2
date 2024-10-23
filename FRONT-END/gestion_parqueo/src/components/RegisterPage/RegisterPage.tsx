import React, { useState } from 'react';
import './RegisterPage.css'; // Importa el archivo de estilos CSS local
import axiosClient from '../../backend/conexion'; // Asegúrate de que la ruta a `conexion.js` sea correcta

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        // Primero, solicitar el token CSRF
        await axiosClient.get('/sanctum/csrf-cookie');

        // Realizar una solicitud POST al backend para registrar el usuario
        const response = await axiosClient.post('/api/registro', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        setSuccessMessage('Registro exitoso. ¡Bienvenido!');
        setErrorMessage('');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } catch (error) {
        setErrorMessage('Hubo un error al registrar. Por favor, intenta nuevamente.');
        setSuccessMessage('');
        console.error('Error al registrar:', error);
      }
    }
  };

  const validateForm = () => {
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return false;
    }
    return true;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <header className="register-header">
        <nav className="register-nav">
          <ul>
            <li><a href="/">Inicio</a></li>
          </ul>
        </nav>
      </header>

      <div className="register-container">
        <h2>Registro de Usuario</h2>

        <form id="registrationForm" onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label className="register-label" htmlFor="correo">Correo:</label>
            <input 
              className="register-input-text" 
              type="email" 
              id="correo" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="register-form-group">
            <label className="register-label" htmlFor="password">Contraseña:</label>
            <input 
              className="register-input-password" 
              type="password" 
              id="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="register-form-group">
            <label className="register-label" htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <input 
              className="register-input-password" 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="register-form-group">
            <label className="register-label" htmlFor="name">Nombre:</label>
            <input 
              className="register-input-text" 
              type="text" 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          <button className="register-button" type="submit">Registrarse</button>
          {errorMessage && <p className="register-error-msg">{errorMessage}</p>}
          {successMessage && <p className="register-success-msg">{successMessage}</p>}
        </form>
      </div>

      <footer className="register-footer">
        <p>© 2024 Artiles Enriquez Marcos Javier. Todos los derechos reservados.</p>
      </footer>
    </>
  );
};

export default RegisterPage;