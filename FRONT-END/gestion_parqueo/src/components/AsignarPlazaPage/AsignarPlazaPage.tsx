import React, { useState } from 'react';
import './AsignarPlazaPage.css'; // Asegúrate de que la ruta sea correcta para tu archivo CSS
import { Link } from 'react-router-dom';

const AsignarPlazaPage: React.FC = () => {
  const [matricula, setMatricula] = useState('');
  const [plaza, setPlaza] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Obtener usuarios almacenados localmente
    let storedUsers: any[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    let storedParkingSpots: any = JSON.parse(localStorage.getItem('parkingSpots') || '{}');

    // Buscar el usuario por matrícula
    const usuarioIndex = storedUsers.findIndex((user: any) => user.matricula === matricula);

    if (usuarioIndex !== -1) {
      const usuario = storedUsers[usuarioIndex];
      const plazaAnterior = usuario.plaza;

      // Actualizar la plaza del usuario
      storedUsers[usuarioIndex].plaza = plaza;
      localStorage.setItem('usuarios', JSON.stringify(storedUsers));

      // Liberar plaza anterior si existe y es diferente a la nueva plaza asignada
      if (plazaAnterior && plazaAnterior !== plaza) {
        storedParkingSpots = {
          ...storedParkingSpots,
          [plazaAnterior]: 'Disponible'
        };
      }

      // Asignar nueva plaza
      storedParkingSpots = {
        ...storedParkingSpots,
        [plaza]: 'Ocupado'
      };

      // Guardar cambios en localStorage para parkingSpots
      localStorage.setItem('parkingSpots', JSON.stringify(storedParkingSpots));

      setMessage(`Plaza ${plaza} asignada correctamente a ${usuario.correo}. Plaza anterior liberada.`);
    } else {
      setMessage(`No se encontró ningún usuario con la matrícula ${matricula}`);
    }

    // Limpiar campos después de enviar
    setMatricula('');
    setPlaza('');
  };

  return (
    <div className="AsignarPlazaPage">
      <header>
        <nav>
          <ul>
            <li><Link to="/AdministratorPage">Regresar</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="plaza-form">
          <h1>Asignar/Modificar Plaza</h1>
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="plaza">Plaza:</label>
              <input
                type="text"
                id="plaza"
                name="plaza"
                value={plaza}
                onChange={(e) => setPlaza(e.target.value)}
                required
              />
            </div>
            <button type="submit">Asignar Plaza</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Artiles Enriquez Marcos Javier. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default AsignarPlazaPage;