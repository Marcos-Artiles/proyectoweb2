import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { Suspense, useEffect } from 'react'
import { AppRouter } from './Routes'
import Spinner from './components/statics/Spinner'
import React from 'react'

function App() {

  useEffect(() => {
    // Datos del administrador
    const adminData = {
      correo: 'admin@admin.com',
      password: 'admin123'
    };

    // Inicializar datos del administrador si no existen en localStorage
    const storedAdmin = localStorage.getItem('admin');
    if (!storedAdmin) {
      localStorage.setItem('admin', JSON.stringify(adminData));
    }

    // Inicializar array de plazas en el localStorage si no existe
    const initialParkingSpots = [
      { Nombre: 'A-1', Disponible: true },
      { Nombre: 'A-2', Disponible: false },
      { Nombre: 'A-3', Disponible: true },
      { Nombre: 'B-1', Disponible: false },
      { Nombre: 'B-2', Disponible: true },
      { Nombre: 'C-1', Disponible: true },
      // Agrega más plazas según sea necesario
    ];

    const storedParkingSpots = localStorage.getItem('parkingSpots');
    if (!storedParkingSpots) {
      localStorage.setItem('parkingSpots', JSON.stringify(initialParkingSpots));
    }
  }, []); 

  return (
    <Router>
      <Suspense fallback={<Spinner/>}>
        <AppRouter/>
      </Suspense>
    </Router>
  )
}

export default App


