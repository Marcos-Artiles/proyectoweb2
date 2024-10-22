// GenerateReportsPage.tsx

import React, { useEffect, useState } from 'react';
import './GenerarReportesPage.css';
import jsPDF from 'jspdf';

const GenerateReportsPage: React.FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [availableSpots, setAvailableSpots] = useState(0);
  const [occupiedSpots, setOccupiedSpots] = useState(0);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const parkingSpots = JSON.parse(localStorage.getItem('parkingSpots') || '{}');

    setUserCount(usuarios.length);

    let available = 0;
    let occupied = 0;
    Object.values(parkingSpots).forEach((status) => {
      if (status === 'Disponible') {
        available++;
      } else if (status === 'Ocupado') {
        occupied++;
      }
    });
    setAvailableSpots(available);
    setOccupiedSpots(occupied);
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Parqueo', 10, 10);
    doc.text(`Usuarios Registrados: ${userCount}`, 10, 20);
    doc.text(`Plazas Disponibles: ${availableSpots}`, 10, 30);
    doc.text(`Plazas Ocupadas: ${occupiedSpots}`, 10, 40);
    doc.save('reporte_de_parqueo.pdf');
  };

  return (
    <div className="GenerateReportsPage">
      <header>
        <nav>
          <ul>
            <button><a href="/AdministratorPage">Regresar</a></button>
          </ul>
        </nav>
      </header>

      <main>
        <h1>Generar Reportes</h1>
        <p>Usuarios Registrados: {userCount}</p>
        <p>Plazas Disponibles: {availableSpots}</p>
        <p>Plazas Ocupadas: {occupiedSpots}</p>
        <button onClick={generatePDF}>Generar PDF</button>
      </main>

      <footer>
        <p>&copy; 2024 Artiles Enriquez Marcos Javier. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default GenerateReportsPage;