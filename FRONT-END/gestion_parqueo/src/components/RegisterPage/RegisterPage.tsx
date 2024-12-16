import React, { useState } from 'react';
import './RegisterPage.css';
import axiosClient from '../../backend/axiosClient'; // Asegúrate de que la ruta sea correcta

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
        await axiosClient.get('/sanctum/csrf-cookie'); // Solicita el token CSRF
        const response = await axiosClient.post('/registro', formData); // Envía los datos de registro
        setSuccessMessage(response.data.message || 'Registro exitoso. ¡Bienvenido!');
        setErrorMessage('');
      } catch (error: any) {
        if (error.response) {
          setErrorMessage(error.response.data.message || 'Error al registrar. Intenta nuevamente.');
        } else {
          setErrorMessage('Error de red. Por favor, verifica tu conexión.');
        }
        console.error('Error al registrar:', error);
      } finally {
        resetForm(); // Limpiar formulario siempre
      }
    }
  };

  const validateForm = () => {
    const { password, confirmPassword, email } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validar formato de correo
    if (!emailRegex.test(email)) {
      setErrorMessage('Por favor ingresa un correo válido.');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
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
        <form onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Registrarse</button>
          {errorMessage && <p>{errorMessage}</p>}
          {successMessage && <p>{successMessage}</p>}
        </form>
      </div>
    </>
  );
};

export default RegisterPage;