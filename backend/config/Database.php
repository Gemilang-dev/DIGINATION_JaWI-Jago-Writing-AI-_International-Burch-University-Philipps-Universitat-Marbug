<?php

namespace backend\config;

use PDO;
use PDOException;
use Flight;


// Azzure microsoft
class Database {
    // --- Kredensial sekarang diambil dari Application Settings di Azure ---
    private static $host;
    private static $port = '3306';
    private static $db;
    private static $user;
    private static $pass;
    private static $charset = 'utf8mb4';

    // Properti untuk menyimpan instance koneksi (Singleton)
    private static $pdo = null;

    /**
     * Metode untuk mendapatkan koneksi database.
     */
    public static function connect() {
        if (self::$pdo === null) {
            // Mengambil konfigurasi dari Environment Variables (Application Settings)
            self::$host = getenv('DB_HOST');
            self::$db   = getenv('DB_NAME');
            self::$user = getenv('DB_USER');
            self::$pass = getenv('DB_PASS');

            // Jika salah satu variabel tidak ditemukan, hentikan proses.
            if (!self::$host || !self::$db || !self::$user || !self::$pass) {
                Flight::halt(500, json_encode(['error' => 'Konfigurasi database tidak lengkap.']));
            }

            $dsn = "mysql:host=" . self::$host . ";port=" . self::$port . ";dbname=" . self::$db . ";charset=" . self::$charset;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ];
            try {
                self::$pdo = new PDO($dsn, self::$user, self::$pass, $options);
            } catch (PDOException $e) {
                Flight::halt(500, json_encode(['error' => 'Database connection failed.']));
            }
        }
        return self::$pdo;
    }

    /**
     * Metode untuk mendapatkan kunci rahasia JWT.
     */
    public static function JWT_SECRET() {
        // Ini juga praktik yang baik untuk disimpan di Application Settings
        $secret = getenv('JWT_SECRET');
        return $secret ? $secret : 'default_fallback_secret';
    }
}

// Local
// class Database 

//     // Properti untuk menyimpan instance koneksi (Singleton)
//     private static $pdo = null;

//     /**
//      * Metode untuk mendapatkan koneksi database.
//      * Menerapkan Singleton Pattern untuk memastikan hanya ada satu koneksi.
//      */
//     public static function connect() {
//         if (self::$pdo === null) {
//             $dsn = "mysql:host=" . self::$host . ";port=" . self::$port . ";dbname=" . self::$db . ";charset=" . self::$charset;
//             $options = [
//                 PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
//                 PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
//             ];
//             try {
//                 self::$pdo = new PDO($dsn, self::$user, self::$pass, $options);
//             } catch (PDOException $e) {
//                 // Untuk API, lebih baik mengembalikan response JSON daripada die()
//                 Flight::halt(500, json_encode(['error' => 'Database connection failed.']));
//             }
//         }
//         return self::$pdo;
//     }

//     /**
//      * Metode untuk mendapatkan kunci rahasia JWT.
//      */
//     public static function JWT_SECRET() {
//         // Ganti dengan kunci rahasia Anda sendiri yang kompleks
//         return 'your_super_secret_and_long_jwt_key';
//     }
// }