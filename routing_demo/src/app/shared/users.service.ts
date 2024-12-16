import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  users = [
    { id:1, name: "Li Wei", age: 25 },
    { id:2, name: "Wang Fang", age: 34 },
   ]
   
   getUsers() {
    return this.users;
   }

   getUserById(id: number) {
    return this.users.find(user => user.id === id);
   }
   
}
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase?: string;
  };
}

export class UserService {
  private baseURL: string = "http://localhost:3000/users";

  // Fetch a single user by ID
  async getUserById(id: number): Promise<User | null> {
    try {
      const response = await fetch(`${this.baseURL}/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch user with ID ${id}`);
      const user: User = await response.json();
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }
}