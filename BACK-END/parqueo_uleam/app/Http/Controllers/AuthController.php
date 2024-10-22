<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
//use App\Models\Registro; // Usar el modelo 
use App\Models\User; // Usar el modelo Registro
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

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('token-name')->plainTextToken;
            return response()->json([
                'token' => $token,
                'user' => $user]);
            }
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
    }

    public function logout(Request $request)
    {
        //Revocar token
        $request -> user() -> currentAccessToken() -> delete();
        return response() -> json(['message' => 'Sesion Cerrada!'], 200);
    }

    public function profile(Request $request)
    {
        //Obtener usuario autentificado
        $user = $request -> user();

        //Retornar la informacion del usuario
        return response() -> json([
            'success' => 'true',
            'user' => $user,
        ], 200);

    }
}