<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Plaza;
use App\Models\Soporte;
use App\Models\Reporte;
use Illuminate\Support\Facades\Auth;

class ReporteController extends Controller
{
    // Verifica si el usuario es administrador
    private function verificarAdministrador()
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json(['message' => 'Usuario no autenticado'], 401);
        }
        
        if ($user->isAdmin != 1) {
            return response()->json(['message' => 'Acceso no autorizado'], 403);
        }
        
        return null; // Retorna null si la verificación es exitosa
    }

    // Generar un reporte
    public function generarReporte()
    {
        $verificacion = $this->verificarAdministrador();
        if ($verificacion) return $verificacion;

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

    // Obtener todos los reportes
    public function obtenerReportes()
    {
        $verificacion = $this->verificarAdministrador();
        if ($verificacion) return $verificacion;

        $reportes = Reporte::all();
        return response()->json($reportes, 200);
    }
}