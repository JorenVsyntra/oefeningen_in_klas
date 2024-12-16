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