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

// create a function that takes an array of objects
// and checks if there is fruit in the array
// if there is fruit, return true
// if there is no fruit, return false

// the clasic way
function checkForFruit(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].category === "fruit") {
            return true;
        }
    }
    return false;
}

// Syntactic sugar for the above
// Now using an buil-in array method: includes
// Map does a callback on every item in the array and returns a new array with the results
// If no item matches the condition, it returns undefined

function checkForFruitIncludes(array) {
    const category = array.map(item => item.category);
    return category.includes('fruit');
}
// Now using an buil-in array method: find
// Find does a callback on every item in the array and returns the first item that matches the condition
// If no item matches the condition, it returns undefined

function findFruit (array) {
    const category = array.find(item => item.category === 'fruit');
    return true;
}
// Now using an buil-in array method: some (opposite of every)
// Some is useless in this case because we are not checking if all items match the condition
// Some does a callback on every item in the array and returns true if any item matches the condition (possible scenario check food for nut allergy)
// If no item matches the condition, it returns false


function checkForFruitSome(array) {
    return array.some(item => item.category === 'fruit');
    console.log(
        `checkForFruitSome returns ${checkForFruitSome(myArray) ? 'true' : 'false'} because ${checkForFruitSome(myArray) ? 'some' : 'no'} items in the array have category 'fruit'`
    );
}
// Now using an buil-in array method: every
// Every is useless in this case because we are not checking if all items match the condition
// Every does a callback on every item in the array and returns true if all items match the condition
// If no item matches the condition, it returns false

function checkForFruitEvery(array) {
    const category = array.every(item => item.category === 'fruit');
    return category;
}



