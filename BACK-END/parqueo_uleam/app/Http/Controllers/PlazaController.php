<?php

namespace App\Http\Controllers;

use App\Models\Plaza;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlazaController extends Controller
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

    // Mostrar todas las plazas disponibles
    public function index()
    {
        $plazas = Plaza::where('disponible', true)->get();
        return response()->json($plazas);
    }

    public function store(Request $request)
    {
        $verificacion = $this->verificarAdministrador();
        if ($verificacion) return $verificacion;
    
        $request->validate([
            'codigo_plaza' => 'required|unique:plazas,codigo_plaza',
        ]);
    
        $plaza = new Plaza();
        $plaza->codigo_plaza = $request->codigo_plaza;
        $plaza->disponible = true; // Asegúrate de establecer un valor predeterminado para "disponible"
        $plaza->save();
    
        return response()->json(['message' => 'Plaza creada con éxito', 'plaza' => $plaza], 201);
    }

    // Actualizar los datos de una plaza
    public function update(Request $request, $id)
    {
        $verificacion = $this->verificarAdministrador();
        if ($verificacion) return $verificacion;

        $request->validate([
            'codigo_plaza' => 'required|string|max:10',
        ]);

        $plaza = Plaza::find($id);

        if (!$plaza) {
            return response()->json(['message' => 'Plaza no encontrada'], 404);
        }

        $plaza->codigo_plaza = $request->codigo_plaza;
        $plaza->save();

        return response()->json(['message' => 'Plaza actualizada con éxito', 'plaza' => $plaza], 200);
    }

    // Actualizar la disponibilidad de una plaza
    public function updateDisponibilidad(Request $request, $id)
    {
        $verificacion = $this->verificarAdministrador();
        if ($verificacion) return $verificacion;

        $request->validate([
            'disponible' => 'required|boolean',
        ]);

        $plaza = Plaza::find($id);

        if (!$plaza) {
            return response()->json(['message' => 'Plaza no encontrada'], 404);
        }

        $plaza->disponible = $request->disponible;
        $plaza->save();

        return response()->json(['message' => 'Disponibilidad de plaza actualizada con éxito', 'plaza' => $plaza], 200);
    }

    // Eliminar una plaza
    public function deletePlazas($id)
    {
        $verificacion = $this->verificarAdministrador();
        if ($verificacion) return $verificacion;

        $plaza = Plaza::find($id);

        if (!$plaza) {
            return response()->json(['message' => 'Plaza no encontrada'], 404);
        }

        $plaza->delete();

        return response()->json(['message' => 'Plaza eliminada con éxito'], 200);
    }
}