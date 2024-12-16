import React, { useState } from 'react';
import './SoportePage.css'; // Asegúrate de importar tu archivo CSS local

const SoportePage: React.FC = () => {
  const [correo, setCorreo] = useState('');
  const [solicitud, setSolicitud] = useState('');
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    guardarSolicitud(correo, solicitud);
    setMensajeConfirmacion('Tu solicitud ha sido enviada correctamente.');
    setCorreo('');
    setSolicitud('');
  };

  const handleChangeCorreo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorreo(event.target.value);
  };

  const handleChangeSolicitud = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSolicitud(event.target.value);
  };

  const guardarSolicitud = (correo: string, solicitud: string) => {
    const solicitudes = JSON.parse(localStorage.getItem('solicitudes') || '[]');
    solicitudes.push({ correo, solicitud });
    localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
  };

  return (
    <div className="SoportePage">
      <header>
        <nav>
          <ul>
            <li><a href="/UserProfile">Retroceder</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <h2>Formulario de Solicitud de Soporte</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="correo">Correo:</label>
            <input type="text" id="correo" name="correo" value={correo} onChange={handleChangeCorreo} required />
          </div>
          <div className="form-group">
            <label htmlFor="solicitud">Escribe tu solicitud:</label>
            <textarea id="solicitud" name="solicitud" value={solicitud} onChange={handleChangeSolicitud} rows={4} required />
          </div>
          <button type="submit">Enviar Solicitud</button>
          {mensajeConfirmacion && <p className="mensaje-confirmacion">{mensajeConfirmacion}</p>}
        </form>
      </main>

      <footer>
        <p>&copy; 2024 Grupo 8, Web 2. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default SoportePage;
