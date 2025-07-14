// File: index.php
<?php
require 'vendor/autoload.php';

require 'backend/Routes/api.php'; 
require 'backend/Routes/userRoutes.php';

Flight::start();