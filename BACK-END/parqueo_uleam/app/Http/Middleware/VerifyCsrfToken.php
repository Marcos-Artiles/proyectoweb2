<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'api/registro',
        'api/login',
        'api/logout',
        'api/profile',
        'api/reportes',
        'api/plazas',
        'api/plaza',
        'api/reset-plazas',
        'api/asignar-plaza',
        'api/plazas/{id}'
    ];
}
