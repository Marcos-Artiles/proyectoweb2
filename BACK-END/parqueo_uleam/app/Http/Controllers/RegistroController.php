<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Registro;

class RegistroController extends Controller
{
    public function store(Request $request)
    {
        // Validar los datos que llegan por la solicitud
        $request->validate([
            'correo_registro' => 'required|email|unique:Registro,correo_registro',
            'password_registro' => 'required',
            'matricula_registro' => 'required',
            'color_carro_registro' => 'required',
        ]);

        // Insertar el registro en la base de datos
        $registro = new Registro();
        $registro->correo_registro = $request->correo_registro;
        $registro->password_registro = bcrypt($request->password_registro); // Encriptar la contraseña
        $registro->matricula_registro = $request->matricula_registro;
        $registro->color_carro_registro = $request->color_carro_registro;
        $registro->save();

        // Responder con un mensaje de éxito
        return response()->json(['message' => 'Registro creado con éxito'], 201);
    }
}
