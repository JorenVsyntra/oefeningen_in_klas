
<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Beach Bar Age Verification</title>
</head>
<body>
    <h1>Beach Bar Entry Form</h1>
    <form action="check.php" method="post">
        <input type="text" name="name" placeholder="Your Name" required><br>
        <input type="number" name="age" placeholder="Your Age" required><br>
        <?php
        if (isset($_POST['age']) && $_POST['age'] > 85) {
            echo "Error: its bad for you";
        }
        ?>
        
        <input type="submit" value="Check Eligibility">

    </form>
</body>
</html>