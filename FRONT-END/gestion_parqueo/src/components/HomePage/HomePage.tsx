// HomePage.tsx

import React from 'react';
import './HomePage.css'; // Archivo de estilos CSS local
import ubicacionParqueoImg from '../../ubicacion_parqueo.png'; // Importa la imagen desde src
import { Link } from 'react-router-dom';


const HomePage: React.FC = () => {
  return (
    <div className="contenedor">
      <header>
        <div className="contenedor_nav">
          <nav>
            <ul>
              <li><Link to="/LoginPage">Iniciar Sesión</Link></li>
              <li><Link to="/RegisterPage">Registrarse</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <h1> ULEAM EN BUENAS MANOS</h1>
        <p>
          En esta página podrá administrar y agendar su parqueo en la ULEAM.
        </p>
      </main>

      <footer>
        <p>© Grupo 8. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
