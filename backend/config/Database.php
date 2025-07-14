<?php

namespace backend\config;

use PDO;
use PDOException;
use Flight;

// class Database {
//     // --- Konfigurasi untuk Menghubungkan ke Database Azure ---
//     private static $host = 'jawii.mysql.database.azure.com';
//     private static $port = '3306';
//     private static $db = 'jawi';
//     private static $user = 'ray';
//     private static $pass = 'Albat280505@'; // <-- GANTI DENGAN PASSWORD ANDA
//     private static $charset = 'utf8mb4';

//     // Properti untuk menyimpan instance koneksi (Singleton)
//     private static $pdo = null;

//     public static function connect() {
//         if (self::$pdo === null) {
//             $dsn = "mysql:host=" . self::$host . ";port=" . self::$port . ";dbname=" . self::$db . ";charset=" . self::$charset;
            
//             // --- LOGIKA PINTAR DIMULAI DI SINI ---
            
//             // Opsi koneksi default yang aman untuk produksi (di Azure)
//             $options = [
//                 PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
//                 PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
//                 PDO::MYSQL_ATTR_SSL_CA => __DIR__ . '/DigiCertGlobalRootCA.crt.pem' 
//             ];

//             // Cek apakah kita sedang berada di lingkungan lokal (XAMPP).
//             // Jika ya, gunakan opsi yang tidak terlalu ketat untuk SSL.
//             // 'REMOTE_ADDR' tidak akan ada jika dijalankan dari terminal/CLI.
//             $is_local_environment = (isset($_SERVER['REMOTE_ADDR']) && in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1'])) || php_sapi_name() === 'cli';

//             if ($is_local_environment) {
//                 // Gunakan opsi yang lebih longgar HANYA untuk development lokal
//                 $options[PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT] = false;
//                 unset($options[PDO::MYSQL_ATTR_SSL_CA]); // Hapus pengecekan sertifikat CA
//             }
            
//             // --- LOGIKA PINTAR BERAKHIR DI SINI ---

//             try {
//                 self::$pdo = new PDO($dsn, self::$user, self::$pass, $options);
//             } catch (PDOException $e) {
//                 die("Koneksi ke database Azure gagal: " . $e->getMessage());
//             }
//         }
//         return self::$pdo;
//     }

//     public static function JWT_SECRET() {
//         return 'kunci_rahasia_untuk_tes_ke_azure';
//     }
// }

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
// Class Database {
//     // --- Konfigurasi untuk Database Lokal (XAMPP) ---
//     private static $host = 'localhost';
//     private static $port = '3306'; 
//     private static $db = 'jawi'; // Pastikan Anda sudah membuat database ini di phpMyAdmin
//     private static $user = 'root'; // User default XAMPP
//     private static $pass = ''; 
//     private static $charset = 'utf8mb4';

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
//                 // Untuk tes lokal, die() cukup untuk melihat error dengan cepat.
//                 die("Koneksi database lokal gagal: " . $e->getMessage());
//             }
//         }
//         return self::$pdo;
//     }

//     /**
//      * Metode untuk mendapatkan kunci rahasia JWT.
//      */
//     public static function JWT_SECRET() {
//         // Ganti dengan kunci rahasia Anda sendiri yang kompleks nanti
//         return 'kunci_rahasia_lokal_untuk_tes';
//     }
// }