class Auth {
    #users;
    #salt;
    
    constructor() {
        this.#users = JSON.parse(localStorage.getItem('users')) || {};
        this.#salt = "santasWorkshop2024";
        console.log(this.#users);
    }

    #hashPassword(password) {
        // use the djb2 algorithm to hash the password with the salt
        // string -> HASHED_STRING ; string compage HASHED_STRING == YAY
        let hash = 5381;
        for (let i = 0; i < password.length; i++) {
            hash = ((hash << 5) + hash) + password.charCodeAt(i);
        }
        for (let i = 0; i < this.#salt.length; i++) {
            hash = ((hash << 5) + hash) + this.#salt.charCodeAt(i);
        }
        return hash.toString();
    }

    register(event) {
        event.preventDefault(); // prevent the default submit behavior of a html form
        const email = document.getElementById('registerEmail').value.toLowerCase();
        const password = document.getElementById('registerPassword').value;

        if (this.#users[email]) {
            // toasts are ideal for this
            alert('Email already registered!');
            return;
        }

        const hashedPassword = this.#hashPassword(password);
        this.#users[email] = hashedPassword;
        localStorage.setItem('users', JSON.stringify(this.#users));
        
        alert('Registration successful!');
        this.toggleForms();
        return;
    }

    login(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value.toLowerCase();
        const password = document.getElementById('loginPassword').value;
        
        const hashedPassword = this.#hashPassword(password);
        
        if (this.#users[email] === hashedPassword) {
            // the hashes check out! yay we are logged in
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('userEmail', email);
            // brute force redirect page switch (not ideal)
            window.location.href = 'secure.html';
        } else {
            alert('Invalid credentials!');
        }
        return;
    }

    toggleForms() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
        registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
    }

    static checkAuth() {
        if (!sessionStorage.getItem('loggedIn')) {
            alert('Please login first!');
            window.location.href = 'index.html';
        }
    }

    static logout() {
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('userEmail');
        window.location.href = 'index.html';
    }
}

const auth = new Auth();