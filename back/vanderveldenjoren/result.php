<?php
session_start();

$menu = [
    'pork_chop' => [
        'name' => 'Pork Chop',
        'base_prep_time' => 20,
        'kitchen_load' => 1
    ],
    'pasta_pesto' => [
        'name' => 'Pasta Pesto',
        'base_prep_time' => 15,
        'kitchen_load' => 1
    ],
    'croque_monsieur' => [
        'name' => 'Croque Monsieur',
        'base_prep_time' => 10,
        'kitchen_load' => 1
    ],
    'french_fries' => [
        'name' => 'French Fries',
        'base_prep_time' => 5,
        'kitchen_load' => 1
    ],
    'salad' => [
        'name' => 'Salad',
        'base_prep_time' => 10,
        'kitchen_load' => 1
    ],
    'cevapi' => [
        'name' => 'Cevapi',
        'base_prep_time' => 20,
        'kitchen_load' => 1
    ]
];

function calculatePrepTime($orders, $kitchenLoad) {
    global $menu;
    $totalTime = 0;
    $maxTime = 0;
    
    foreach ($orders as $item => $quantity) {
        if ($quantity > 0) {
            $itemTime = $menu[$item]['base_prep_time'] * $quantity;
            $totalTime += $itemTime;
            $maxTime = max($maxTime, $itemTime);
        }
    }
    
    $adjustedTime = $maxTime + ($totalTime * 0.3);
    $finalTime = $adjustedTime * $kitchenLoad;
    
    return ceil($finalTime);
}

if (isset($_POST['reset'])) {
    unset($_SESSION['order']);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
    $order = [];
    foreach ($menu as $key => $item) {
        $quantity = (int)$_POST[$key] ?? 0;
        if ($quantity > 0) {
            $order[$key] = $quantity;
        }
    }
    
    if (!empty($order)) {
        $_SESSION['order'] = $order;
        header('Location: result.php');
        exit;
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Order Summary</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }

        h1, h2 {
            color: #2c3e50;
            margin-bottom: 20px;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }

        .order-summary {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .order-item {
            padding: 10px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
        }

        .order-item:last-child {
            border-bottom: none;
        }

        a {
            display: inline-block;
            background-color: #3498db;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Order Summary</h1>
    
    <div class="order-summary">
        <h2>Your Order:</h2>
        <?php foreach ($_SESSION['order'] as $item => $quantity): ?>
        <div class="order-item">
            <span><?php echo htmlspecialchars($menu[$item]['name']); ?></span>
            <span><?php echo $quantity; ?> portion(s)</span>
        </div>
        <?php endforeach; ?>
        
        <h2>Estimated Preparation Time:</h2>
        <?php
        $kitchenLoad = 1; // Adjust this value as needed
        $prepTime = calculatePrepTime($_SESSION['order'], $kitchenLoad);
        ?>
        <p>Your order will take approximately <?php echo $prepTime; ?> minutes to prepare.</p>
    </div>
    
    <div style="margin-top: 20px;">
        <a href="index.php">Place Another Order</a>
    </div>
</body>
</html>




