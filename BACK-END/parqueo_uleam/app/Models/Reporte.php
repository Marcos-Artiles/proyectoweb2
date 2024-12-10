<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reporte extends Model
{
    use HasFactory;

    protected $fillable = [
        'total_usuarios',
        'usuarios_normales',
        'administradores',
        'total_soportes',
        'soportes_atendidos',
        'soportes_pendientes',
        'total_plazas',
        'plazas_disponibles',
        'plazas_no_disponibles',
    ];
}
