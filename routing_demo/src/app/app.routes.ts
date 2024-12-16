import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },          // Home page
    { path: 'about', component: AboutComponent },    // About page
    { path: 'contact', component: ContactComponent }, // Contact page
    { path: 'user/:id', component: UserComponent },  // User page with ID parameter
    { path: '**', redirectTo: '' }                  // Redirect invalid routes to home
];
