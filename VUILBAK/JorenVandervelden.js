console.log (fetch ('https://dummyjson.com/users'))
fetch('https://dummyjson.com/users')
    .then(response => response.json())
    .then(data => console.log(data))
