<?php

// File: /jawiproject/test_dao.php

// 1. Memuat semua dependensi dan kelas kita
require 'vendor/autoload.php';

// 2. Menggunakan namespace dari UserDAO agar bisa kita panggil
use backend\dao\UserDAO;

echo "<pre>"; // Agar output lebih rapi di browser

try {
    // 3. Membuat instance dari UserDAO kita
    $userDAO = new UserDAO();
    echo "UserDAO berhasil dibuat.\n";

    // 4. Menyiapkan data pengguna baru untuk dites
    $email = "test.user." . rand(100, 999) . "@jawi.com"; // rand() untuk email unik setiap kali tes
    $password = "password123";
    $fullName = "Test User";

    echo "Mencoba menambahkan pengguna baru:\n";
    echo "Nama: " . $fullName . "\n";
    echo "Email: " . $email . "\n";

    // 5. Hash password (langkah keamanan yang wajib)
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    echo "Password berhasil di-hash.\n";

    // 6. Memanggil metode addUser untuk menyimpan data ke DB
    $newUserId = $userDAO->addUser($email, $hashedPassword, $fullName);
    echo "Memanggil metode addUser...\n";

    // 7. Jika berhasil, tampilkan pesan sukses
    echo "\n========================================\n";
    echo "SUKSES! Pengguna baru berhasil ditambahkan dengan ID: " . $newUserId . "\n";
    echo "========================================\n";

} catch (Exception $e) {
    // Jika terjadi error, tampilkan pesan errornya
    echo "\n========================================\n";
    echo "ERROR! Terjadi kesalahan: " . $e->getMessage() . "\n";
    echo "========================================\n";
}

echo "</pre>"; 