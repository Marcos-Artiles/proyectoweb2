<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

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

        // Insertar el registro en la base de datos
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password); // Encriptar la contraseña
        $user->save();

        // Responder con un mensaje de éxito
        return response()->json(['message' => 'Registro creado con éxito'], 201);
    }
}