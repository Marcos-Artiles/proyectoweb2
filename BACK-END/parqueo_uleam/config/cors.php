<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],  // Permitir todos los métodos

    'allowed_origins' => ['*'],  // Permitir todas las fuentes

    'allowed_origins_patterns' => [''],

    'allowed_headers' => ['*'],  // Permitir todos los encabezados

    'exposed_headers' => [''],

    'max_age' => 0,

    'supports_credentials' => true, // Cambia a true si necesitas soportar cookies/autenticación

];