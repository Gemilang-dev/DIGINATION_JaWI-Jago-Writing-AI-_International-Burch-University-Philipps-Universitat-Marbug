<?php

namespace backend\services;

use backend\dao\UserDAO;
use Exception;

class UserService {

    private $userDAO;

    public function __construct() {
        $this->userDAO = new UserDAO();
    }

    /**
     * Mengelola seluruh logika registrasi pengguna.
     */
    public function registerUser($data) {
        // 1. Validasi data (sederhana)
        if (empty($data['email']) || empty($data['password']) || empty($data['full_name'])) {
            throw new Exception("Email, password, and full name are required.", 400);
        }

        // 2. Cek apakah email sudah ada
        if ($this->userDAO->getUserByEmail($data['email'])) {
            throw new Exception("Email already registered.", 409); // 409 Conflict
        }

        // 3. Hash password untuk keamanan
        $hashed_password = password_hash($data['password'], PASSWORD_BCRYPT);

        // 4. Tambahkan pengguna ke database
        $newUserId = $this->userDAO->addUser($data['email'], $hashed_password, $data['full_name']);

        // 5. Ambil data pengguna yang baru dibuat (tanpa password) dan kembalikan
        return $this->userDAO->getUserById($newUserId);
    }
}