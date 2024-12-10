<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

// Asegúrate de importar el modelo Plaza
use App\Models\Plaza;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Relación uno a uno con la plaza
    public function plaza()
    {
        return $this->belongsTo(Plaza::class, 'plaza_id'); // Aquí se establece la relación
        return $this->hasMany(Soporte::class);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = 'users';
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}