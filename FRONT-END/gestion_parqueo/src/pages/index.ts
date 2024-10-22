import React from 'react';
import Home from '../components/HomePage/HomePage'

export { Home }

export const LoginPage = React.lazy(() => import('../components/LoginPage/LoginPage'));
export const UserProfile = React.lazy(() => import('../components/UserProfile/UserProfile'));
export const AdministratorPage = React.lazy(() => import('../components/AdministratorPage/AdministratorPage'));
export const RegisterPage = React.lazy(() => import('../components/RegisterPage/RegisterPage'));
export const PlazasPage = React.lazy(() => import('../components/PlazasPage/PlazasPage'));
export const AsignarPlazasPage = React.lazy(() => import('../components/AsignarPlazaPage/AsignarPlazaPage'));
export const GenerarReportesPage = React.lazy(() => import('../components/GenerarReportesPage/GenerarReportesPage'));
export const SoportePage = React.lazy(() => import('../components/SoportePage/SoportePage'));