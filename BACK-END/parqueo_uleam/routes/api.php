<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegistroController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PlazaController;
use App\Http\Controllers\SoporteController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\ResetController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//rutas publicas
Route::post('/login', [AuthController::class, 'login']); //iniciar sesion
Route::post('/registro', [RegistroController::class, 'store']); //registrarse
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

Route::middleware('auth:sanctum')->group(function(){
    //manejo del perfil
    Route::post('/logout', [AuthController::class, 'logout']); //cerrar sesion
    Route::get('/profile', [AuthController::class, 'profile']); //obtener perfil

    //manejo de plazas
    Route::get('/plazas', [PlazaController::class, 'index']); // Ver plazas disponibles
    Route::post('/plazas', [PlazaController::class, 'store']); // Crear una nueva plaza
    Route::delete('/plazas/{id}', [PlazaController::class, 'deletePlazas']); //Borrar una plaza
    Route::put('/plaza/{id}', [PlazaController::class, 'update']); //actualizar plaza
    Route::put('/plaza/{id}/disponibilidad', [PlazaController::class, 'updateDisponibilidad']); //actualizar disponibilidad
    Route::post('/reset-plazas', [ResetController::class, 'resetPlazas']);

    //manejo de soporte
    Route::post('/soporte', [SoporteController::class, 'store']); // Crear solicitud de soporte
    Route::get('/soporte', [SoporteController::class, 'index']); // Ver solicitudes de soporte (admin)
    Route::put('/soporte/{id}', [SoporteController::class, 'update']); // Actualizar estado de una solicitud
    Route::put('/asignar-plaza', [SoporteController::class, 'asignarPlaza']); //Asignar una plaza

    //manejo de reportes
    Route::get('/reportes', [ReporteController::class, 'obtenerReportes']); // Listar reportes
    Route::post('/reportes', [ReporteController::class, 'generarReporte']); // Generar un nuevo reporte
});