<?php

namespace App\Http\Controllers;

use App\Models\Plaza;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResetController extends Controller
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

    public function resetPlazas()
    {
        // Verificar si el usuario es administrador
        $verificacion = $this->verificarAdministrador();
        if ($verificacion) return $verificacion;

        // Reiniciar las plazas a disponibles
        Plaza::where('disponible', false)->update(['disponible' => true]);

        // Limpiar las plazas asignadas de los usuarios
        User::whereNotNull('plaza_id')->update(['plaza_id' => null]);

        // Devolver una respuesta de éxito
        return response()->json(['message' => 'Plazas y asignaciones de usuarios reiniciadas con éxito'], 200);
    }
}