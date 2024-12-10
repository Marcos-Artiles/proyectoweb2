<?php

namespace App\Http\Controllers;

use App\Models\Soporte; // Importar el modelo Soporte
use App\Models\User;    // Importar el modelo User
use App\Models\Plaza;   // Importar el modelo Plaza
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SoporteController extends Controller
{
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
        $user = auth()->user();

        if (!$user || $user->isAdmin != 1) {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        $soportes = Soporte::with('user')->get();
        return response()->json(['soportes' => $soportes]);
    }

    // Actualizar el estado de una solicitud de soporte
    public function update(Request $request, $id)
    {
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
        // Validar los datos de la solicitud
        $request->validate([
            'codigo_plaza' => 'required|string|max:10', // Código de la plaza a asignar
            'user_id' => 'required|exists:users,id',    // Usuario al que se asignará la plaza
        ]);
    
        // Buscar la plaza solicitada
        $plaza = Plaza::where('codigo_plaza', $request->codigo_plaza)->first();
    
        // Verificar si la plaza existe y está disponible
        if (!$plaza || !$plaza->disponible) {
            return response()->json(['message' => 'La plaza no está disponible o no existe'], 400);
        }
    
        // Buscar al usuario
        $usuario = User::find($request->user_id);
    
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