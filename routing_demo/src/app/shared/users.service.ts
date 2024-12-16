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
