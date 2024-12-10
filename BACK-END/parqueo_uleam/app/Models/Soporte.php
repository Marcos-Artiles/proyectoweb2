<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Soporte extends Model
{
    use HasFactory;

    protected $table = 'soporte'; // Nombre de la tabla en la base de datos
    protected $fillable = ['user_id', 'mensaje', 'atendido']; // Campos que se pueden asignar en masa

    // Relación con el modelo User (Muchos mensajes de soporte pueden pertenecer a un usuario)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}