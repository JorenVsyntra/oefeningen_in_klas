<?php
echo 'hello world';
echo '<hr>';

// 5 variables to concatenate
$country = 'Belgium';
$represented = 'Represented';
$artist = 'Red Sebastian';
$movie = 'Ariel the mermaid';
$wishes = 'best of luck';

// Concatenation
$final = $country." wil be ".$represented." by ". $artist. " He based hit artist name on the ".$movie.". We wish him the ".$wishes."!";

// the same without concatenation

echo '<br>';
$final = "<p class='test'>$country wil be $represented by $artist. He based hit artist name on the $movie. We wish him the $wishes!</p>";
echo $final.'<br>';

$final = '<p class="test">'.$country.'wil be $represented by $artist. He based hit artist name on the $movie. We wish him the $wishes!</p>';
echo $final.'<br>';