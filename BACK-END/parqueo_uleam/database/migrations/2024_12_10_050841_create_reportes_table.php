<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportesTable extends Migration
{
    public function up()
    {
        Schema::create('reportes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('total_usuarios');
            $table->unsignedBigInteger('usuarios_normales');
            $table->unsignedBigInteger('administradores');
            $table->unsignedBigInteger('total_soportes');
            $table->unsignedBigInteger('soportes_atendidos');
            $table->unsignedBigInteger('soportes_pendientes');
            $table->unsignedBigInteger('total_plazas');
            $table->unsignedBigInteger('plazas_disponibles');
            $table->unsignedBigInteger('plazas_no_disponibles');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reportes');
    }
}