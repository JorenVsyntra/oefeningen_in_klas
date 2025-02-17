<?php
require_once 'common.php';

if (isset($_POST['register'])) {
    $conn = connectDB();
    
    // Sanitize inputs
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];
    
    // Check if email exists
    $check_sql = "SELECT id FROM users WHERE email = ?";
    $stmt = mysqli_prepare($conn, $check_sql);
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    
    if (mysqli_num_rows($result) > 0) {
        echo "<div class='alert alert-danger'>Email already exists!</div>";
    } else {
        // Hash password
        $password_hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);
        $date = date("Y-m-d H:i:s");
        
        // Insert new user
        $insert_sql = "INSERT INTO users (name, email, status, date, password) VALUES (?, ?, 0, ?, ?)";
        $stmt = mysqli_prepare($conn, $insert_sql);
        mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $date, $password_hash);
        
        if (mysqli_stmt_execute($stmt)) {
            echo "<div class='alert alert-success'>Registration successful!</div>";
            header("Location: login.php");
            exit();
        } else {
            echo "<div class='alert alert-danger'>Registration failed!</div>";
        }
    }
    mysqli_close($conn);
}
?>
