import { Component } from  '@angular/core';
import { RouterOutlet, RouterLink } from  '@angular/router';

@Component({
selector:  'app-root',
imports: [RouterOutlet, RouterLink],
templateUrl:  './app.component.html',
styleUrls: ['./app.component.css'],
standalone:  true
})

export  class  AppComponent {
title  =  'Yay! Routing is life';
}