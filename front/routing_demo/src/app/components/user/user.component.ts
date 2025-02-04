import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../../shared/users.service';

@Component({
  selector: 'app-user',
  standalone: true,
  template: '<h2>User ID: {{ userId }}</h2>'
})
export class UserComponent implements OnInit, OnDestroy {
  userId: string = '';
  private routeSub!: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Subscribe to parameter changes
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
  }

  ngOnDestroy() {
    // Clean up subscription when component is destroyed
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
import { UserService, User } from './userService';

export class UserComponent {
  private userService = new UserService();
  public user: User | null = null;

  constructor(private userId: number) {}

  async loadUser() {
    this.user = await this.userService.getUserById(this.userId);
    this.displayUser();
  }

  displayUser() {
    if (this.user) {
      console.log("User Details:");
      console.log(`Name: ${this.user.name}`);
      console.log(`Email: ${this.user.email}`);
      console.log(`Phone: ${this.user.phone || "N/A"}`);
      console.log(`Website: ${this.user.website || "N/A"}`);
      console.log(
        `Company: ${this.user.company?.name || "N/A"} - ${this.user.company?.catchPhrase || ""}`
      );
    } else {
      console.log("User not found!");
    }
  }
}

// Example usage
const userComponent = new UserComponent(1); // Fetch user with ID 1
userComponent.loadUser();