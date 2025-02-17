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

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['reset'])) {
        unset($_SESSION['order']);
    } elseif (isset($_POST['submit'])) {
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
}

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
?>
<!DOCTYPE html>
<html>
<head>
    <title>Restaurant Order System</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }

        h1 {
            color: #2c3e50;
            margin-bottom: 20px;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }

        .menu-item {
            background: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        input[type="number"] {
            width: 60px;
            padding: 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 10px;
        }

        button[name="reset"] {
            background-color: #e74c3c;
        }

        .prep-time {
            color: #666;
            margin-left: 15px;
        }

    </style>
</head>
<body>
    <h1>Place Your Order</h1>
    <form method="POST" action="">
        <?php foreach ($menu as $key => $item): ?>
        <div class="menu-item">
            <label>
                <?php echo htmlspecialchars($item['name']); ?>:
                <input type="number" name="<?php echo $key; ?>" min="0" value="0">
            </label>
            <span class="prep-time">
                Prep Time: <?php echo calculatePrepTime([$key => 1], $item['kitchen_load']); ?> minutes
            </span>
        </div>
        <?php endforeach; ?>
        
        <div style="margin-top: 20px;">
            <button type="submit" name="submit">Place Order</button>
            <button type="submit" name="reset">Reset Order</button>
        </div>
    </form>
</body>
</html>