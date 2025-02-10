<?php
// print_r($_POST);

$name = $_POST['naam'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$age = $_POST['age'];

echo "Hello $name, I received your transmission.<br>";
echo "Email: $email<br>";
echo "Phone: $phone<br>";
echo "Age: $age<br>";

// logic operators AND OR - && ||
if ($age < 16) {
    echo "No booze for you.";
} elseif ($age >= 16 && $age < 18) {
    echo "Only beer for you.";
} else {
    echo "You can have beer and liquors.";
}


?>