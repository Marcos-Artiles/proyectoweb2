// LoginPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Archivo de estilos CSS local

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const adminCredentials = JSON.parse(localStorage.getItem('adminCredentials') || '{}');
    console.log('Credenciales del administrador en localStorage:', adminCredentials);

    if (email === adminCredentials.email && password === adminCredentials.password) {
      console.log('Credenciales de administrador ingresadas correctamente.');
      navigate('/AdministratorPage'); 
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((user: any) => user.correo === email && user.password === password);

    if (usuario) {
      localStorage.setItem('currentUser', JSON.stringify(usuario));
      navigate('/UserProfile'); 
    } else {
      alert('Credenciales incorrectas. Por favor, verifique su correo y contraseña.');
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