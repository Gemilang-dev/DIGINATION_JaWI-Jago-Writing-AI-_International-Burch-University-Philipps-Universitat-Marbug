<?php

// backend/Routes/api.php

// Gunakan kelas Database yang baru untuk koneksi
use backend\config\Database;
use Flight;

/**
 * Rute dasar untuk menguji koneksi database.
 * Endpoint: GET /
 */
Flight::route('GET /', function(){
    try {
        // Panggil metode connect() dari kelas Database
        $pdo = Database::connect();

        if ($pdo) {
            Flight::json(['status' => 'success', 'message' => 'Connection to database successful using the new method.']);
        }
    } catch (Exception $e) {
        Flight::json(['status' => 'error', 'message' => $e->getMessage()], 500);
    }
});

/**
 * Contoh rute untuk endpoint API masa depan.
 * Endpoint: GET /api/v1/status
 */
Flight::route('GET /api/v1/status', function(){
    Flight::json([
        'service' => 'JaWi AI API',
        'version' => '1.0',
        'status' => 'OK'
    ]);
});