<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User; // Usar el modelo User
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash; // Importar la clase Hash para comparar la contraseña

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

            // Crear el token de acceso
            $token = $user->createToken('token-name')->plainTextToken;

            // Verificar si el usuario es administrador
            $role = ($user->isAdmin == 1) ? 'administrador' : 'usuario normal';

            // Devolver la respuesta con los datos del usuario y el rol
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
        // Revocar el token
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Sesión cerrada!'], 200);
    }

    public function profile(Request $request)
    {
        // Obtener el usuario autenticado
        $user = $request->user();

        // Retornar la información del usuario
        return response()->json([
            'success' => 'true',
            'user' => $user,
        ], 200);
    }
}