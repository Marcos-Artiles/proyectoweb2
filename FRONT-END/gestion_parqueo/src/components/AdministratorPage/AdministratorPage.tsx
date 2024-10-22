import React, { useState, useEffect } from 'react';
import './AdministratorPage.css'; // Asegúrate de que la ruta sea correcta para tu archivo CSS
import { Link } from 'react-router-dom';

const AdministratorPage: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<{ correo: string; matricula: string; solicitud: string }[]>([]);

  useEffect(() => {
    const solicitudesGuardadas = JSON.parse(localStorage.getItem('solicitudes') || '[]');
    setSolicitudes(solicitudesGuardadas);
  }, []);

  return (
    <div className="AdministratorPage">
      <header>
        <nav>
          <ul>
            <li><a href="/">Inicio</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="admin-buttons">
          <button><Link to="/GenerarReportesPage">Generar Reporte</Link></button>
          <button><Link to="/AsignarPlazasPage">Asignar Plaza</Link></button>
          <button><Link to="/PlazasPage">Verificar Plazas</Link></button>
        </div>

        <div className="solicitudes-container">
          <h2>Solicitudes de Soporte</h2>
          {solicitudes.length > 0 ? (
            <ul className="solicitudes-list">
              {solicitudes.map((solicitud, index) => (
                <li key={index} className="solicitud-item">
                  <p><strong>Correo:</strong> {solicitud.correo}</p>
                  <p><strong>Matrícula:</strong> {solicitud.matricula}</p>
                  <p><strong>Solicitud:</strong> {solicitud.solicitud}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Fin de las solicitudes pendientes.</p>
          )}
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Artiles Enriquez Marcos Javier. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default AdministratorPage;