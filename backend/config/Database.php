<?php

namespace backend\config;

use PDO;
use PDOException;
use Flight;

class Database {
    // --- Kredensial Database Azure Anda ---
    private static $host = 'jawii.mysql.database.azure.com';
    private static $port = '3306';
    private static $db = 'jawi';
    private static $user = 'jawi_admin@jawii';
    private static $pass = 'YourStrongPasswordHere'; // <-- GANTI DENGAN PASSWORD ANDA
    private static $charset = 'utf8mb4';

    // Properti untuk menyimpan instance koneksi (Singleton)
    private static $pdo = null;

    /**
     * Metode untuk mendapatkan koneksi database.
     * Menerapkan Singleton Pattern untuk memastikan hanya ada satu koneksi.
     */
    public static function connect() {
        if (self::$pdo === null) {
            $dsn = "mysql:host=" . self::$host . ";port=" . self::$port . ";dbname=" . self::$db . ";charset=" . self::$charset;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ];
            try {
                self::$pdo = new PDO($dsn, self::$user, self::$pass, $options);
            } catch (PDOException $e) {
                // Untuk API, lebih baik mengembalikan response JSON daripada die()
                Flight::halt(500, json_encode(['error' => 'Database connection failed.']));
            }
        }
        return self::$pdo;
    }

    /**
     * Metode untuk mendapatkan kunci rahasia JWT.
     */
    public static function JWT_SECRET() {
        // Ganti dengan kunci rahasia Anda sendiri yang kompleks
        return 'your_super_secret_and_long_jwt_key';
    }
}