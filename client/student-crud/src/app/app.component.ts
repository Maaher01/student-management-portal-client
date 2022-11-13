import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {}

  ngDoCheck(): void {
    this.IsloggedIn()
  }

  IsloggedIn() {
    return !!localStorage.getItem('credentials')
  }

  displayName() {
    return JSON.parse(localStorage.getItem("credentials")).name.split(' ')[0];
  }

  logOut() {
    window.localStorage.removeItem('credentials');
    this.router.navigate(['/login'])
  }
}
