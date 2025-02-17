<?php
include 'common.php';
session_start();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h1>Welcome <?php echo htmlspecialchars($_SESSION['name']); ?></h1>
        <a href="logout.php" class="btn btn-danger">Logout</a>
    </div>
</body>
</html