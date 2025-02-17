<?php
require_once 'common.php';

if (isset($_POST['login'])) {
    $conn = connectDB();
    
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = $_POST['password'];
    
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    
    if ($row = mysqli_fetch_assoc($result)) {
        if (password_verify($password, $row['password'])) {
            $_SESSION['name'] = $row['name'];
            $_SESSION['username'] = $row['email'];
            $_SESSION['token'] = bin2hex(random_bytes(5));
            
            header('Location: dashboard.php');
            exit();
        } else {
            echo "<div class='alert alert-danger'>Invalid password!</div>";
        }
    } else {
        echo "<div class='alert alert-danger'>User not found!</div>";
    }
    mysqli_close($conn);
}
?>

