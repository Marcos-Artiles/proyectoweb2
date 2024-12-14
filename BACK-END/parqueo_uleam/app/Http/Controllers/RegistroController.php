<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Plaza;

class RegistroController extends Controller
{
    public function store(Request $request)
    {
        // Validar los datos que llegan por la solicitud
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
        ]);

        // Verificar si hay plazas disponibles
        $plazaDisponible = Plaza::where('disponible', true)->first();

        if (!$plazaDisponible) {
            return response()->json(['message' => 'No hay plazas disponibles en este momento'], 400);
        }

        // Crear el usuario y asignarle una plaza
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password); // Encriptar la contraseña
        $user->plaza_id = $plazaDisponible->id; // Asignar la plaza disponible
        $user->save();

        // Actualizar la disponibilidad de la plaza
        $plazaDisponible->disponible = false;
        $plazaDisponible->save();

        // Responder con un mensaje de éxito
        return response()->json([
            'message' => 'Registro creado con éxito y plaza asignada',
            'user' => $user,
            'plaza' => $plazaDisponible,
        ], 201);
    }
}