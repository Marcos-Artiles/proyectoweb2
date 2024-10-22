import React, { useState, useEffect } from 'react';
import './PlazasPage.css'; // Asegúrate de importar tu archivo CSS local

const PlazasPage: React.FC = () => {
  const [parkingSpots, setParkingSpots] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Obtener y establecer el estado inicial de parkingSpots desde localStorage
    const storedParkingSpots = JSON.parse(localStorage.getItem('parkingSpots') || '{}');
    setParkingSpots(storedParkingSpots);

    // Escuchar cambios en localStorage y actualizar estado cuando cambie 'parkingSpots'
    const storageChangeHandler = (e: StorageEvent) => {
      if (e.key === 'parkingSpots') {
        setParkingSpots(JSON.parse(e.newValue || '{}'));
      }
    };

    window.addEventListener('storage', storageChangeHandler);

    return () => {
      window.removeEventListener('storage', storageChangeHandler);
    };
  }, []);

  const updateParkingSpot = (spot: string, availability: string) => {
    const updatedSpots = { ...parkingSpots, [spot]: availability };
    localStorage.setItem('parkingSpots', JSON.stringify(updatedSpots));
    setParkingSpots(updatedSpots);
  };

  return (
    <div className="PlazasPage">
      <header>
        <nav>
          <ul>
            <li><a href="/AdministratorPage">Regresar</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="plazas-container">
          {Object.entries(parkingSpots).map(([spot, availability]) => (
            <div key={spot} className="plaza-item">
              <span>{spot}</span>
              <span>{availability}</span>
              <button onClick={() => updateParkingSpot(spot, availability === 'Disponible' ? 'Ocupado' : 'Disponible')}>
                Cambiar Estado
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Artiles Enriquez Marcos Javier. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default PlazasPage;
