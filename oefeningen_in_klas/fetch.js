const url = 'https://jsonplaceholder.typicode.com/todos';
fetch(url)
.then(res => res.json())
.then(data => console.log(data))
.catch(e => console.log(e));

// HTTP VERB (GET) (POST,DELETE,PUT)