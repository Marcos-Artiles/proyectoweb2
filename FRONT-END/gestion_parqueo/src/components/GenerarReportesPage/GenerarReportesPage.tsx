import React, { useEffect, useState } from 'react';
import './GenerarReportesPage.css';
import jsPDF from 'jspdf';
import axiosClient from '../../backend/axiosClient';
import { useNavigate } from 'react-router-dom';

const GenerateReportsPage: React.FC = () => {
  const [reporte, setReporte] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No se encontró un token de sesión.');
        navigate('/');
        return;
      }

      // Llamada al backend para cerrar sesión
      await axiosClient.post('/logout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remover el token y los datos del usuario del localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Redirigir a la página de inicio
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      setError('Error al cerrar sesión.');
    }
  };

  // Función para generar el reporte desde el backend
  const generarReporte = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No se encontró un token de sesión.');
        navigate('/');
        return;
      }
  
      // Realiza la solicitud para obtener el token CSRF
      await axiosClient.get('/sanctum/csrf-cookie');
  
      // Llama al backend para generar el reporte
      const response = await axiosClient.post('/reportes',{},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      setReporte(response.data.reporte);
      setError(null);
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      setError('Error al generar el reporte. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Generar un PDF con el reporte
  const generatePDF = () => {
    if (!reporte) {
      alert('No se ha generado un reporte.');
      return;
    }

    const doc = new jsPDF();
    doc.text('Reporte de Parqueo', 10, 10);
    doc.text(`Usuarios Registrados: ${reporte.total_usuarios}`, 10, 20);
    doc.text(`Usuarios Normales: ${reporte.usuarios_normales}`, 10, 30);
    doc.text(`Administradores: ${reporte.administradores}`, 10, 40);
    doc.text(`Plazas Disponibles: ${reporte.plazas_disponibles}`, 10, 50);
    doc.text(`Plazas Ocupadas: ${reporte.plazas_no_disponibles}`, 10, 60);
    doc.text(`Total de Soportes: ${reporte.total_soportes}`, 10, 70);
    doc.text(`Soportes Atendidos: ${reporte.soportes_atendidos}`, 10, 80);
    doc.text(`Soportes Pendientes: ${reporte.soportes_pendientes}`, 10, 90);
    doc.save('reporte_de_parqueo.pdf');
  };

  // Generar reporte al cargar la página
  useEffect(() => {
    generarReporte();
  }, []);

  return (
    <div className="GenerateReportsPage">
      <header>
        <nav>
          <ul>
            {/* Botón de cierre de sesión */}
            <li>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </li>
            {/* Botón para regresar */}
            <li>
              <button onClick={() => navigate('/AdministratorPage')}>Regresar</button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <h1>Generar Reportes</h1>
        {loading ? (
          <p>Cargando reporte...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <p>Usuarios Registrados: {reporte?.total_usuarios}</p>
            <p>Usuarios Normales: {reporte?.usuarios_normales}</p>
            <p>Administradores: {reporte?.administradores}</p>
            <p>Plazas Disponibles: {reporte?.plazas_disponibles}</p>
            <p>Plazas Ocupadas: {reporte?.plazas_no_disponibles}</p>
            <p>Total de Soportes: {reporte?.total_soportes}</p>
            <p>Soportes Atendidos: {reporte?.soportes_atendidos}</p>
            <p>Soportes Pendientes: {reporte?.soportes_pendientes}</p>
            <button onClick={generatePDF}>Generar PDF</button>
          </>
        )}
      </main>

      <footer>
        <p>&copy; 2024 Grupo 8, Web 2. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default GenerateReportsPage;