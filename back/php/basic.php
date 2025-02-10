<?php
//print_r ($_POST['naam']);
if (isset($_POST['naam'])) {
    // here be dragons

    echo "same file post";
    print_r($_POST);
    // stop the script
    exit;
}


// PHP PARSER van php code naar HTML
// php modus
// dev server (local) php -S localhost:8000 (in file folder)
// index.php (document root) localhost:8000 (index.php)
// otherfiles.php localhost:8000/otherfiles.php

// variables
$a = 5;
$b = 'single quote';
$c = "double quote";
$d = 2.5;

// concatenate glues strings together!
$concatenate = $b.' - '.$c;
$concatenateDouble = "$b - $c";

$escaped = "Wij zijn de \"Vikings\" van het noorden";
echo $escaped;

// if elseif else

if ($a == 3) {
    echo 'a is 3';
} elseif ($a == 4) {
    echo 'a is 4';
} elseif ($a == 5) {
    echo 'a is 5';
} else {
    echo 'a is not 3 or 4 or 5';
}

// arrays arrays arrays
$myArray = ['a','b','c'];
echo $myArray[0]; // return a;
echo $myArray[1]; // return b;
echo $myArray[2]; // return c;

// no go echo $myArray;

print_r($myArray);

// iteraties while/for/foreach
$i = 0;
$arrayLenght = count($myArray);
while($i < $arrayLenght) {
    echo $myArray[$i];
    $i++;
}

for ($i = 0; $i > 3; $i++) {
    echo $myArray[$i];
}

foreach ($myArray as $value) {
    echo $value;
}

# single comment
// single comment

/* exercise (multi line comment)
Create an array with fav dishes
and show them in a list and if you would 'cevapi' show that i like that; */

$favieDishes = ['Pizza','Tacos','Pad Thai','Sushi','Cevapi'];
print_r($favieDishes);

echo "<h2>My favorite dishes</h2>";
echo "<ul>";
foreach ($favieDishes as $dish) {
   if ($dish == 'Tacos') {
     echo "<li>$dish - Mmmmmmm</li>";
   } else {
     echo "<li>$dish</li>";
   }
}
echo "</ul>";

// Assocs Array
$favieDishesAssoc = [
    "Pad Thai" => "Thai food",
    "Pizza" => "Italian food",
    "Sushi" => "Japanese food",
    "Tacos" => "Mexicano food",
    "Cevapi" => "Balkan food"
];

echo $favieDishesAssoc['Sushi'];
print_r($favieDishesAssoc);

foreach ($favieDishesAssoc as $dish => $type) {
    echo "<li>$dish - $type</li>";
}

// Multidimensional Associative Arrays

$favieDishesAssocMulti = [
    "Pad Thai" => ["pinda","kip","noedels","soy sauce"],
    "Pizza" => ["cheese","peperoni","salame","pomodoro"],
    "Sushi" => ["rice","salmon","seeweed"],
    "Tacos" => ["salsa","kip","mais","torilla","bacon"],
    "Cevapi" => ["meat","cottage cheese","sliced onions"]
];

echo "<hr>";

// how do we iterate?
// 1.1.0,1,2,3
// 2.2.0,1,2,3

foreach ($favieDishesAssocMulti as $dish => $ingredients) {
    echo $dish."<hr>";
    foreach ($ingredients as $ingredient) {
        echo "<li>$ingredient</li>";
    }
    echo "<br>";
    echo "<hr>";
}

// functions always precede the function keyword
function calculate ($a,$b) {
    return $a + $b;
}

function calculateVoid ($a,$b) {
    echo $a + $b;
}

calculateVoid(1,4); // show 5

$result = calculate(1,4);
echo $result; // show 5

function calcTotal ($amount, $vat=false) {
    // function with opetional argument becuz
    // the default value will be false
    if ($vat) {
        $amountVat = ($amount * $vat)/100;
        return $amountVat + $amount;
    } else {
        return $amount;
    }
}

$totalcalc = calcTotal(200,21);


?>
<!-- html modus -->
<!-- DO NOT FORGET: PHP PARSES THE HTML TO OUR BROWSER
NO LEVEL OF DYN INTERACTION IS POSSIBLE WITH STATIC HTML
HTTP SERVER BACKEND NAAR DE CODE NAAR DE LOGICA - ALWAYS HTTP REQUEST NEED -->



<form action="register.php" method="post">
    <input type="text" name="naam" placeholder="Name">
    <input type="email" name="email" placeholder="Email">
    <input type="tel" name="phone" placeholder="Phone">
    <input type="number" name="age" placeholder="Age">
    <input type="submit" value="Submit">
    <input type="reset" value="Reset">
</form>