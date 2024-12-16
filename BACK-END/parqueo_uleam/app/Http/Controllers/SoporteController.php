<?php

namespace App\Http\Controllers;

use App\Models\Soporte;
use App\Models\User;
use App\Models\Plaza;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SoporteController extends Controller
{
    // Verifica si el usuario es administrador
    private function verificarAdministrador()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Usuario no autenticado'], 401);
        }

        if ($user->isAdmin != 1) {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        return null; // Retorna null si la verificación es exitosa
    }

    // Crear una solicitud de soporte
    public function store(Request $request)
    {
        $request->validate([
            'mensaje' => 'required|string|max:500', // Mensaje obligatorio y no mayor de 500 caracteres
        ]);

        $soporte = new Soporte();
        $soporte->user_id = $request->user()->id; // ID del usuario autenticado
        $soporte->mensaje = $request->mensaje;
        $soporte->save();

        return response()->json(['message' => 'Solicitud de soporte enviada con éxito', 'soporte' => $soporte], 201);
    }

    // Ver todas las solicitudes de soporte (solo para el administrador)
    public function index()
    {
        $verificacion = $this->verificarAdministrador();
        if ($verificacion) return $verificacion;

        $soportes = Soporte::with('user')->get();
        return response()->json(['soportes' => $soportes]);
    }

    // Actualizar el estado de una solicitud de soporte
    public function update(Request $request, $id)
    {
        $verificacion = $this->verificarAdministrador();
        if ($verificacion) return $verificacion;

        $request->validate([
            'atendido' => 'required|boolean', // Solo puede ser true o false
        ]);

        $soporte = Soporte::find($id);

        if (!$soporte) {
            return response()->json(['message' => 'Solicitud de soporte no encontrada'], 404);
        }

        $soporte->atendido = $request->atendido;
        $soporte->save();

        return response()->json(['message' => 'Estado de la solicitud actualizado', 'soporte' => $soporte], 200);
    }

        public function asignarPlaza(Request $request)
    {
        $verificacion = $this->verificarAdministrador();
        if ($verificacion) return $verificacion;
    
        // Validar los datos de la solicitud
        $request->validate([
            'codigo_plaza' => 'required|string|max:10', // Código de la plaza
            'email' => 'required|email|exists:users,email', // Email del usuario
        ]);
    
        // Buscar al usuario por email
        $usuario = User::where('email', $request->email)->first();
        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    
        // Buscar la plaza solicitada
        $plaza = Plaza::where('codigo_plaza', $request->codigo_plaza)->first();
    
        // Verificar si la plaza existe y está disponible
        if (!$plaza || !$plaza->disponible) {
            return response()->json(['message' => 'La plaza no está disponible o no existe'], 400);
        }
    
        // Verificar si el usuario ya tiene una plaza asignada
        if ($usuario->plaza_id) {
            return response()->json(['message' => 'El usuario ya tiene una plaza asignada'], 400);
        }
    
        // Asignar la plaza al usuario
        $usuario->plaza_id = $plaza->id;
        $usuario->save();
    
        // Actualizar la disponibilidad de la plaza
        $plaza->disponible = false;
        $plaza->save();
    
        // Retornar una respuesta de éxito
        return response()->json([
            'message' => 'Plaza asignada con éxito',
            'usuario' => $usuario,
            'plaza' => $plaza
        ], 200);
    }
}