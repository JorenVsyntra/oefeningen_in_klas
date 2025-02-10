<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate input
    if (!isset($_POST['name']) || !isset($_POST['age']) || empty($_POST['name']) || !is_numeric($_POST['age'])) {
        $_SESSION['error'] = "Please provide both name and valid age";
        header("Location: index.php");
        exit();
    }

    $_SESSION['name'] = htmlspecialchars($_POST['name']);
    $_SESSION['age'] = (int)$_POST['age'];
    
    function getDrinkType($age) {
        if ($age < 16) {
            return "soda only";
        } elseif ($age >= 16 && $age < 18) {
            return "beer only";
        } else {
            return "all drinks including liquor";
        }
    }
    
    function getTicketColor($age) {
        if ($age < 16) {
            return "red";
        } elseif ($age >= 16 && $age < 18) {
            return "orange";
        } else {
            return "green";
        }
    }
    
    $_SESSION['drink_type'] = getDrinkType($_SESSION['age']);
    $_SESSION['ticket_color'] = getTicketColor($_SESSION['age']);
    
    header("Location: print.php");
    exit();
}