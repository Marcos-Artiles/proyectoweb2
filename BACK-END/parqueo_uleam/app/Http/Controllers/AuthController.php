<?php

namespace App\Http\Controllers;

use App\Models\User; // Usar el modelo User
use App\Models\Plaza; // Usar el modelo Plaza
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Intentar iniciar sesión con las credenciales proporcionadas
        if (Auth::attempt($credentials)) {
            $user = Auth::user(); // Obtener el usuario autenticado

            // Verificar si hay alguna plaza disponible
            $plazaDisponible = Plaza::where('disponible', true)->first();

            if ($plazaDisponible) {
                // Asignar la plaza disponible al usuario
                $user->plaza_id = $plazaDisponible->id;
                $user->save();

                // Marcar la plaza como no disponible
                $plazaDisponible->disponible = false;
                $plazaDisponible->save();
            }

            // Crear el token de acceso
            $token = $user->createToken('token-name')->plainTextToken;

            // Verificar si el usuario es administrador
            $role = ($user->isAdmin == 1) ? 'administrador' : 'usuario normal';

            // Devolver la respuesta con los datos del usuario, el rol y el token
            return response()->json([
                'token' => $token,
                'user' => $user,
                'role' => $role,  // Incluimos el rol en la respuesta
            ]);
        }

        // Si las credenciales son incorrectas
        return response()->json(['message' => 'Credenciales incorrectas'], 401);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
    
        // Revocar el token del usuario
        $user->currentAccessToken()->delete();
    
        // Si el usuario tiene una plaza asignada, liberar la plaza
        if ($user->plaza_id) {
            $plaza = Plaza::find($user->plaza_id);
            if ($plaza) {
                $plaza->disponible = true; // Marcar la plaza como disponible
                $plaza->save();
            }
    
            // Eliminar la plaza asignada del usuario
            $user->plaza_id = null;
            $user->save();
        }
    
        return response()->json(['message' => 'Sesión cerrada y plaza liberada'], 200);
    }

    public function profile(Request $request)
    {
        // Obtener el usuario autenticado
        $user = $request->user()->load('plaza'); // Cargar la relación con la plaza
    
        // Retornar la información del usuario junto con la plaza
        return response()->json([
            'success' => 'true',
            'user' => $user,
        ], 200);
    }
}