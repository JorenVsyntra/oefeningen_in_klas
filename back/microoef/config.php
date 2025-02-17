<?php
// Databaseverbinding
$servername = "localhost";
$username = "root"; // Pas aan naar je instellingen
$password = "";
$dbname = "db school";

$conn = new mysqli($servername, $username, $password, $dbname);

// Controleer de verbinding
if ($conn->connect_error) {
    die("Verbinding mislukt: " . $conn->connect_error);
}

// Verwerk formulier
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input
    $name = filter_input(INPUT_POST, 'name');

    if (!empty($name)) {
        // Prepared statement
        $stmt = $conn->prepare("INSERT INTO courses (name) VALUES (?)");
        $stmt->bind_param("s", $name);

        // Voeg cursus toe
        $stmt->execute();

        // Controleer of de cursus is toegevoegd
        if ($stmt->affected_rows > 0) {
            echo "<p style='color: green;'>Cursus succesvol toegevoegd!</p>";
        } else {
            echo "<p style='color: red;'>Fout bij toevoegen: " . $stmt->error . "</p>";
        }

        $stmt->close();
    } else {
        echo "<p style='color: red;'>Vul een geldige cursusnaam in.</p>";
    }
}

// Verwijder cursus
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];

    $stmt = $conn->prepare("DELETE FROM courses WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo "<p style='color: green;'>Cursus succesvol verwijderd!</p>";
    } else {
        echo "<p style='color: red;'>Fout bij verwijderen: " . $stmt->error . "</p>";
    }

    $stmt->close();
}

// Update cursus
if (isset($_POST['update'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];

    if (!empty($name)) {
        $stmt = $conn->prepare("UPDATE courses SET name = ? WHERE id = ?");
        $stmt->bind_param("si", $name, $id);

        if ($stmt->execute()) {
            
            echo "<p style='color: green;'>Cursus succesvol aangepast!</p>";
        } else {
            echo "<p style='color: red;'>Fout bij aanpassen: " . $stmt->error . "</p>";

        }
    }
}
// Haal alle cursussen op
$result = $conn->query("SELECT id, name FROM courses");

$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Cursusbeheer</title>
    <style>
        body { font-family: Arial, sans-serif; }
        table { width: 50%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid black; padding: 10px; text-align: left; }
        th { background-color: #f2f2f2; }
        .container { width: 60%; margin: auto; }
    </style>
</head>
<body>

<div class="container">
    <h2>Nieuwe cursus toevoegen</h2>
    <form method="post">
        <label for="name">Cursusnaam:</label>
        <input type="text" id="name" name="name" required>
        <button type="submit">Toevoegen</button>
    </form>

    <h2>Bestaande cursussen</h2>
    <table>
        <tr>
            <th>ID</th>
            <th>Cursusnaam</th>
        </tr>
        <?php if ($result->num_rows > 0): ?>
            <?php while ($row = $result->fetch_assoc()): ?>
                <tr>
                    <td><?php echo htmlspecialchars($row["id"]); ?></td>
                    <td><?php echo htmlspecialchars($row["name"]); ?></td>
                    <td><a href="config.php?delete=<?php echo $row["id"]; ?>">Verwijder</a></td>
                    <td><a href="config.php?edit=<?php echo $row["id"]; ?>">Wijzigen</a></td>
                </tr>
            <?php endwhile; ?>
        <?php else: ?>
            <tr><td colspan="2">Geen cursussen gevonden.</td></tr>
        <?php endif; ?>
    </table>
</div>

</body>
</html>
