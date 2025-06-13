<?php

namespace backend\dao;

use backend\config\Database;

class UserDAO {

    private $pdo;

    public function __construct() {
        
        $this->pdo = Database::connect();
    }

    /**
     * Menambahkan pengguna baru ke dalam database.
     * Menerima password yang SUDAH di-hash.
     */
    public function addUser($email, $hashed_password, $full_name) {
        $stmt = $this->pdo->prepare(
            "INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)"
        );
        $stmt->execute([$email, $hashed_password, $full_name]);
        
        // Mengembalikan ID dari pengguna yang baru saja dibuat
        return $this->pdo->lastInsertId();
    }

    /**
     * Mencari pengguna berdasarkan alamat email.
     * Penting untuk mengecek apakah email sudah terdaftar.
     */
    public function getUserByEmail($email) {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch(); // Mengembalikan data pengguna jika ditemukan, atau false jika tidak
    }
    
    /**
     * Mencari pengguna berdasarkan ID.
     * Berguna setelah registrasi untuk mengambil data lengkap.
     */
    public function getUserById($id) {
        $stmt = $this->pdo->prepare("SELECT id, email, full_name, subscription_type, created_at FROM users WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }
}