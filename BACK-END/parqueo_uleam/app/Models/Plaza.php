<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plaza extends Model
{
    use HasFactory;

    // Relación uno a uno con el usuario
    public function user()
    {
        return $this->belongsTo(User::class, 'plaza_id'); // Deberías usar belongsTo, no hasOne, porque una plaza pertenece a un usuario.
    }

    protected $fillable = ['codigo_plaza']; // Asegúrate de que el nombre del campo en la base de datos sea correcto, en este caso 'codigo_plaza'.
}