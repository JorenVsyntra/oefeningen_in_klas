<?php
// common.php
function loggedIn() {
    return isset($_SESSION['token']) && !empty($_SESSION['token']);
}

function requireLogin() {
    if (!loggedIn()) {
        header('Location: login.php');
        exit();
    }
}

function connectDB() {
    $host = 'localhost';
    $user = 'db_user';
    $pass = 'db_password';
    $db = 'database';
    
    $conn = mysqli_connect($host, $user, $pass, $db);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    return $conn;
}
