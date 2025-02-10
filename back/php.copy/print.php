<?php
session_start();

// Debug session data
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if all required session variables exist
if (!isset($_SESSION['name']) || !isset($_SESSION['age']) || !isset($_SESSION['drink_type'])) {
    echo "Session data is missing. Please fill out the form first.";
    echo "<br><a href='index.php'>Go back to form</a>";
    exit();
}

try {
    $ticket = [
        'date' => date('d-m-Y H:i:s'),
        'name' => $_SESSION['name'],
        'age' => $_SESSION['age'],
        'drink_type' => $_SESSION['drink_type']
    ];

    // Save ticket to CSV
    $csvFile = 'tickets.csv';
    $isNewFile = !file_exists($csvFile);

    if (!is_writable(dirname($csvFile)) && !is_writable($csvFile)) {
        throw new Exception("Cannot write to file $csvFile");
    }

    $fp = fopen($csvFile, 'a');
    if (!$fp) {
        throw new Exception("Could not open file $csvFile");
    }

    if ($isNewFile) {
        fputcsv($fp, ['Date', 'Name', 'Age', 'Drink Type' ], ",", '"', "\\");
    }

    fputcsv($fp, [
        $ticket['date'],
        $ticket['name'],
        $ticket['age'],
        $ticket['drink_type'],
    ], ",", '"', "\\");

    fclose($fp);
?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Beach Bar Ticket</title>
        <style>
            .ticket {
                width: 300px;
                padding: 20px;
                border: 2px solid #000;
                margin: 20px;
                background-color: <?php echo htmlspecialchars($_SESSION['ticket_color']); ?>;
                color: <?php echo $_SESSION['ticket_color'] == 'orange' ? 'black' : 'white'; ?>;
            }
            .error {
                color: red;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="ticket">
            <h2>Beach Bar Entry Ticket</h2>
            <p>Date: <?php echo htmlspecialchars($ticket['date']); ?></p>
            <p>Name: <?php echo htmlspecialchars($ticket['name']); ?></p>
            <p>Age: <?php echo htmlspecialchars($ticket['age']); ?></p>
            <p>Allowed Drinks: <?php echo htmlspecialchars($ticket['drink_type']); ?></p>
        </div>
        <a href="index.php">Back to Form</a>
        <?php
        // Clear the session after successful ticket creation
        session_destroy();
        ?>
    </body>
    </html>
<?php
} catch (Exception $e) {
    echo "<div class='error'>";
    echo "An error occurred: " . htmlspecialchars($e->getMessage());
    echo "<br><a href='index.php'>Go back to form</a>";
    echo "</div>";
}
?>