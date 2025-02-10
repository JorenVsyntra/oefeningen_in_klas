<?php

// $_GET['name'];
// $_GET['email'];
// $_GET['phone'];

$name = $_GET['name'];
$email = $_GET['email'];
$phone = $_GET['phone'] ?? '00000';
?>

<form action="update.php" method="post">
    <input type="text" name="name" placeholder="Name" value="<?php echo htmlspecialchars($name) ?>">
    <input type="email" name="email" placeholder="Email" value="<?php echo htmlspecialchars($email) ?>">
    <input type="text" name="phone" placeholder="Phone" value="<?php echo htmlspecialchars($phone) ?>">
    <button type="submit">Submit</button>
</form>

// update.php ;
// submit the form and get the values from 
// the form use the $_POST superglobal
