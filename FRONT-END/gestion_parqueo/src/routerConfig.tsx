import React from "react";
import { Home, LoginPage, UserProfile, AdministratorPage, RegisterPage, PlazasPage, AsignarPlazasPage, GenerarReportesPage, SoportePage } from "./pages";

export const routes = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/LoginPage',
        element: <LoginPage/>
    },
    {
        path: '/UserProfile',
        element: <UserProfile/>
    },
    {
        path: '/AdministratorPage',
        element: <AdministratorPage/>
    },
    {
        path: '/RegisterPage',
        element: <RegisterPage/>
    },
    {
        path: '/PlazasPage',
        element: <PlazasPage/>
    },
    {
        path: '/AsignarPlazasPage',
        element: <AsignarPlazasPage/>
    },
    {
        path: '/GenerarReportesPage',
        element: <GenerarReportesPage/>
    },
    {
        path: '/SoportePage',
        element: <SoportePage/>
    }
]