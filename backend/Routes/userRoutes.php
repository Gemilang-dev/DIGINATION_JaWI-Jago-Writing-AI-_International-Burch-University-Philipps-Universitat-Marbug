<?php

// backend/Routes/userRoutes.php

use backend\services\UserService;
use Flight;

/**
 * All routes related to the User entity.
 * Prefix: /api/v1
 */

/**
 * Route for registering a new user.
 * Endpoint: POST /api/v1/register
 */
Flight::route('POST /api/v1/register', function(){
    // Get the JSON data from the request body
    $data = Flight::request()->data->getData();
    
    // Create an instance of the UserService
    $userService = new UserService();

    try {
        // Attempt to register the user
        $newUser = $userService->registerUser($data);
        
        // If successful, send a success JSON response
        Flight::json([
            'status' => 'success',
            'message' => 'User registered successfully.',
            'data' => $newUser
        ], 201); // 201 Created

    } catch (Exception $e) {
        // If there's an error from the UserService, send an error JSON response
        Flight::json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], $e->getCode() ?: 400);
    }
});

// You can add more user-related routes here later, like /login, /users/{id}, etc.