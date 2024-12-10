<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('soporte', function (Blueprint $table) {
            $table->id(); // ID único para cada mensaje de soporte
            $table->unsignedBigInteger('user_id'); // Relación con la tabla users
            $table->text('mensaje'); // El mensaje del usuario
            $table->boolean('atendido')->default(false); // Estado de la solicitud
            $table->timestamps(); // Campos created_at y updated_at

            // Clave foránea
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('soporte');
    }
};