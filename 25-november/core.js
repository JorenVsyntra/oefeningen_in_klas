// The given array
let myArray = [
    {
        name: "apple",
        price: 1.99,
        quantity: 5,
        category: "fruit"
    },
    {
        name: "banana",
        price: 2.99,
        quantity: 10,
        category: "fruit"
    },
    {
        name: "carrot",
        price: 0.99,
        quantity: 20,
        category: "vegetable"
    },
    {
        name: "lettuce",
        price: 1.99,
        quantity: 10,
        category: "vegetable"
    },
    {
        name: "broccoli",
        price: 2.99,
        quantity: 5,
        category: "vegetable"
    },
    {
        name: "orange",
        price: 1.99,
        quantity: 10,
        category: "fruit"
    },
    {
        name: "grape",
        price: 2.99,
        quantity: 5,
        category: "fruit"
    }
];

// Function to check if there is any fruit in the array
function checkForFruit(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].category === "fruit") {
            return true;
        }
    }
    return false;
}

// Button click event listener
document.getElementById("checkFruitButton").addEventListener("click", function() {
    const result = checkForFruit(myArray);
    const resultText = result ? "The array contains fruits!" : "No fruits found in the array.";
    document.getElementById("result").innerText = resultText;
});



// Why Is Array/Object Destructuring So Useful And How To Use It
// https://www.youtube.com/watch?v=NIq3qLaHCIs
// Destructuring is a way to extract data from an array or object
// and assign it to a variable
// Destructuring an array


let myArray3 = ["apple", "banana", "carrot"];
let [fruitD1, fruitD2, fruitD3] = myArray3;
console.log(fruitD1); // apple

// Destructuring an object
let myObject = {
    fruitname: "apple",
    price: 1.99,
    quantity: 5,
    category: "fruit",
    origin: {
        country: "USA",
        state: "California"
    }
};

let { fruitname, price, ...rest} = myObject;
let { country, state } = myObject.origin;
let { origin: { country: country2, state: state2 } } = myObject;
console.log(rest); // apple
console.log (country); // USA
console.log (state); // California 
console.log (country2); // USA
console.log (state2); // California