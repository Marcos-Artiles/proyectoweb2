<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;


class Registro extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'Registro'; 

    protected $fillable = [
        'correo_registro',
        'password_registro',
        'matricula_registro',
        'color_carro_registro',
    ];

    // protected $hidden = [

    // ]
}