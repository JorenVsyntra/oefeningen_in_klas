/*
Authentication Application - Subproblems and Implementation Steps
=============================================================

1. User Interface (HTML Structure)
   - Create login form
   - Create registration form
   - Design secure page for authenticated users
   - Implement form toggle functionality

2. User Management (Class Structure)
   - Design Auth class
   - Initialize user storage
   - Handle user data persistence
   - Implement private fields (#users, #salt)

3. User Registration
   - Capture form data
   - Validate email (check duplicates)
   - Process password security
   - Store user data
   - Provide user feedback

4. Password Security
   - Implement salt mechanism
   - Create password hashing algorithm
   - Secure storage of hashed passwords

5. User Authentication (Login)
   - Validate credentials
   - Match hashed passwords (we cant't unhash, so we must compare hash input to stored hash);
   - Manage user sessions
   - Handle login errors

6. Session Management
   - Store user session data
   - Implement session checks
   - Handle session expiry (i)
   - Manage secure page access

7. Data Persistence
   - Implement localStorage for users
   - Implement sessionStorage for active session
   - Handle data serialization/deserialization

8. Security Considerations
   - Email case sensitivity handling
   - Form submission prevention
   - Secure page protection
   - Password hashing with salt

9. User Experience
   - Form switching mechanism
   - Error messages and alerts
   - Successful registration feedback
   - Redirect after login

10. Code Organization
    - Separate concerns (Auth class) MVC
    - Private methods and properties
    - Event handling
    - Form management

Implementation Order:
--------------------
1. Set up HTML structure (forms and secure page)
2. Create basic Auth class structure
3. Implement user storage mechanism
4. Add password security (hashing)
5. Build registration functionality
6. Develop login system
7. Add session management
8. Implement secure page protection
9. Add user feedback and alerts
10. Polish user experience and interface

Each subproblem builds upon the previous ones, creating a complete
authentication system that handles user registration, login, and
secure access while maintaining good security practices.
*/

const users = {
    "mas@mas.com": "-z63qk2",
    "testie@test.com": "-z63qk1"
}

const email = "mas@mas.com";
console.log(users[email]);