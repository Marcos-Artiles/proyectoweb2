<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Plaza;
use App\Models\Soporte;
use App\Models\Reporte;

class ReporteController extends Controller
{
    public function generarReporte()
    {
        // Recopilar datos
        $totalUsuarios = User::count();
        $usuariosNormales = User::where('isAdmin', 0)->count();
        $administradores = User::where('isAdmin', 1)->count();

        $totalSoportes = Soporte::count();
        $soportesAtendidos = Soporte::where('atendido', true)->count();
        $soportesPendientes = Soporte::where('atendido', false)->count();

        $totalPlazas = Plaza::count();
        $plazasDisponibles = Plaza::where('disponible', true)->count();
        $plazasNoDisponibles = Plaza::where('disponible', false)->count();

        // Crear el reporte
        $reporte = Reporte::create([
            'total_usuarios' => $totalUsuarios,
            'usuarios_normales' => $usuariosNormales,
            'administradores' => $administradores,
            'total_soportes' => $totalSoportes,
            'soportes_atendidos' => $soportesAtendidos,
            'soportes_pendientes' => $soportesPendientes,
            'total_plazas' => $totalPlazas,
            'plazas_disponibles' => $plazasDisponibles,
            'plazas_no_disponibles' => $plazasNoDisponibles,
        ]);

        return response()->json(['message' => 'Reporte generado con éxito', 'reporte' => $reporte], 201);
    }

    public function obtenerReportes()
    {
        $reportes = Reporte::all();
        return response()->json($reportes, 200);
    }
}