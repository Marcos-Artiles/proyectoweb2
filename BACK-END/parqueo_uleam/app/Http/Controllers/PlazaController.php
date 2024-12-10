<?php

namespace App\Http\Controllers;

use App\Models\Plaza;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class PlazaController extends Controller
{
    // Mostrar todas las plazas disponibles
    public function index()
    {
        // Obtener el usuario autenticado
        $user = Auth::user();

        // Verificar si el usuario está autenticado
        if (!$user) {
        return response()->json(['message' => 'Usuario no autenticado'], 401);
        }

        $role = ($user->isAdmin == 1) ? 'administrador' : 'usuario normal';
        if ($role == 'administrador'){
            $plazas = Plaza::where('disponible', true)->get();
            return response()->json($plazas);
        }else{
            return response()->json(['message' => 'Acceso no autorizado'], 201);
        }

    }

    // Crear una nueva plaza
    public function store(Request $request)
    {
        $request->validate([
            'codigo_plaza' => 'required|unique:plazas,codigo_plaza',
        ]);

        $plaza = new Plaza();
        $plaza->codigo_plaza = $request->codigo_plaza;
        $plaza->save();

        return response()->json(['message' => 'Plaza creada con éxito', 'plaza' => $plaza], 201);
    }

    public function update(Request $request, $id)
    {
        // Validar los datos que llegan por la solicitud
        $request->validate([
            'codigo_plaza' => 'required|string|max:10', // Asegúrate de que el código sea una cadena válida y con un tamaño adecuado
        ]);

        // Buscar la plaza por su ID
        $plaza = Plaza::find($id);

        // Verificar si la plaza existe
        if (!$plaza) {
            return response()->json(['message' => 'Plaza no encontrada'], 404);
        }

        // Modificar el código de la plaza
        $plaza->codigo_plaza = $request->codigo_plaza;
        $plaza->save();

        // Retornar una respuesta de éxito
        return response()->json(['message' => 'Plaza actualizada con éxito', 'plaza' => $plaza], 200);
    }

    public function updateDisponibilidad(Request $request, $id)
    {
        // Validar los datos que llegan por la solicitud
        $request->validate([
            'disponible' => 'required|boolean', // Asegúrate de que el valor sea un booleano
        ]);
    
        // Buscar la plaza por su ID
        $plaza = Plaza::find($id);
    
        // Verificar si la plaza existe
        if (!$plaza) {
            return response()->json(['message' => 'Plaza no encontrada'], 404);
        }
    
        // Modificar la disponibilidad de la plaza
        $plaza->disponible = $request->disponible;
        $plaza->save();
    
        // Retornar una respuesta de éxito
        return response()->json(['message' => 'Disponibilidad de plaza actualizada con éxito', 'plaza' => $plaza], 200);
    }

    public function deletePlazas($id)
    {
        // Buscar la plaza por su ID
        $plaza = Plaza::find($id);
    
        // Verificar si la plaza existe
        if (!$plaza) {
            return response()->json(['message' => 'Plaza no encontrada'], 404);
        }
    
        // Eliminar la plaza
        $plaza->delete();
    
        // Retornar una respuesta de éxito
        return response()->json(['message' => 'Plaza eliminada con éxito'], 200);
    }

}