const url = 'https://dummyjson.com/users';

fetch(url)
    .then(response => response.json())
    .then(data => {
        const users = data.users; 

        // 1. Create a new array with only name, phone, gender, and age
        const basicInfo = users.map(user => ({
            name: user.firstName + ' ' + user.lastName,
            phone: user.phone,
            gender: user.gender,
            age: user.age
        }));
        console.log('Array with name, phone, gender, age:', basicInfo);

        // 2. Create a new array with only women
        const women = users.filter(user => user.gender === 'female');
        console.log('Array with only women:', women);

        // 3. Create a new array with only men
        const men = users.filter(user => user.gender === 'male');
        console.log('Array with only men:', men);

        // 4. Create a new array with name, phone, gender, age, bloodGroup, and eye color for users with blue eyes
        const blueEyes = users
        .filter(user => user.eyeColor === 'Blue')
            .map(user => ({
                name: user.firstName + ' ' + user.lastName,
                phone: user.phone,
                gender: user.gender,
                age: user.age,
                bloodGroup: user.bloodGroup,
                eyeColor: user.eyeColor
            }));
            console.log('Array with blue-eyed users:', blueEyes);

        // 5. Calculate the total combined weight of all users
        const totalWeight = users.reduce((sum, user) => sum + user.weight, 0);
        console.log('Total combined weight of all users:', totalWeight);
    })

