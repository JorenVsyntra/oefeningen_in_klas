<?php
    // $randomNumber = 45;
    $randomNumber = rand(1, 100);
    $message = "Guess a number between 1 and 100!";
    $celebrate = false;

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $userGuess = isset($_POST['guess']) ? (int)$_POST['guess'] : 0;
        if ($userGuess === $randomNumber) {
            $message = "🎉🎊 Congratulations! You guessed the correct number: $randomNumber 🎊🎉";
            $celebrate = true;
        } else {
            $message = "😢 Sorry, the correct number was $randomNumber. Try again! 😢";
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crazy Cool Gamble Game</title>
    <style>
        body {
            font-family: 'Comic Sans MS', cursive, sans-serif;
            text-align: center;
            margin-top: 50px;
            background: linear-gradient(270deg, red, orange, yellow, green, cyan, blue, violet);
            background-size: 1400% 1400%;
            animation: rainbow-bg 20s ease infinite;
            color: white;
        }
        @keyframes rainbow-bg {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .box {
            display: inline-block;
            padding: 20px;
            border: 5px solid;
            border-image: linear-gradient(45deg, red, yellow, lime, cyan, blue, magenta, red) 1;
            border-radius: 20px;
            background-color: rgba(0, 0, 0, 0.7);
            box-shadow: 0 0 20px white;
            font-size: 1.5em;
            animation: rainbow-border 20s linear infinite;
        }
        @keyframes rainbow-border {
            0% { border-image-source: linear-gradient(45deg, red, yellow, lime, cyan, blue, magenta, red); }
            100% { border-image-source: linear-gradient(45deg, blue, magenta, red, yellow, lime, cyan, blue); }
        }
        input[type="number"] {
            width: 80%;
            padding: 15px;
            font-size: 1.5em;
            border-radius: 10px;
            border: 3px solid;
            border-image: linear-gradient(45deg, red, yellow, green, cyan, blue, violet) 1;
            text-align: center;
            display: block;
            margin: 10px auto;
            background: rgba(255, 255, 255, 0.8);
        }
        button {
            padding: 10px 20px;
            font-size: 1.2em;
            background: linear-gradient(45deg, red, yellow, green, cyan, blue, violet);
            border: none;
            cursor: pointer;
            border-radius: 10px;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 0 10px white;
        }
        button:hover {
            transform: scale(1.1);
            box-shadow: 0 0 20px white;
        }
        @keyframes confetti {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
        }
        .confetti {
            position: fixed;
            top: 0;
            left: 50%;
            width: 10px;
            height: 10px;
            background: gold;
            animation: confetti 2s linear infinite;
        }
        #congratsOverlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            font-size: 2em;
            color: white;
        }
    </style>
</head>
<body>
    <div class="box">
        <h1><?php echo $message; ?></h1>
        <form method="POST">
            <input type="number" name="guess" min="1" max="100" required>
            <button type="submit">🔥 Submit Guess 🔥</button>
        </form>
    </div>
    <?php if ($celebrate): ?>
        <div id="congratsOverlay">
            🎉 Congratulations! You guessed the correct number: <?php echo $randomNumber; ?> 🎉
        </div>

        <script>
            // Confetti creation
            for (let i = 0; i < 100; i++) {
                let confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 5000);
            }

            // Remove congratulations overlay after 15 seconds
            const congratsOverlay = document.getElementById('congratsOverlay');
            setTimeout(() => {
                congratsOverlay.style.display = 'none';
            }, 5000);
        </script>
    <?php endif; ?>
</body>
</html>