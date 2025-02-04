const urlPlaceholder = 'https://jsonplaceholder.typicode.com/todo';
const url1 = 'http://localhost:3000/posts';
const url2 = 'http://localhost:3000/comments';
const url3 = 'http://localhost:3000/profile';
const output1 = document.getElementById('output1');
const output2 = document.getElementById('output2');
const output3 = document.getElementById('output3');
function fetchdata1() {
fetch(url1)
.then(res => res.json())
.then(data => {
    // console.log(data);
    // for (let i = 0; i < 100; i++) {
    //     output1.innerHTML += `<li>${data[i].title}</li>`
    // }
    // for (let i = 101; i < 200; i++) {
    //     output2.innerHTML += `<li>${data[i].completed}</li>`
    // }
    data.forEach(item => {
        output1.innerHTML += `<li>${item.title}</li>`
    })
    
})
.catch(e => console.log(e));
}
 
function fetchdata2() {
fetch(url2)
.then(res => res.json())
.then(data => {
    data.forEach(item => {
        output1.innerHTML += `<li>${item.text}</li>`
    })
    
})
.catch(e => console.log(e));
}
 
function fetchdata3() {
fetch(url3)
.then(res => res.json())
.then(data => {
    data.forEach(item => {
        output1.innerHTML += `<li>${item.text}</li>`
    })
    
})
.catch(e => console.log(e));
}
 
const btn1 = document.getElementById('btn1');
btn1.addEventListener('click', fetchdata1);
 
const btn2 = document.getElementById('btn2');
btn2.addEventListener('click', fetchdata2);
 
const btn3 = document.getElementById('btn3');
btn3.addEventListener('click', fetchdata3);



const clearData = () => {
    output1.innerHTML = '';
    output2.innerHTML = '';
    output3.innerHTML = '';
}
 
btn1.addEventListener('click', clearData);
btn2.addEventListener('click', clearData);
btn3.addEventListener('click', clearData);