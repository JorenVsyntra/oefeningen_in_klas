
function fetchdata() 
{
    fetch('https://dummyjson.com/users')
    .then(response => response.json())
    .then(data => console.log(data))
}
