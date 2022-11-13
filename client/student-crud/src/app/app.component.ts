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
    return !!localStorage.getItem('email')
  }

  logOut() {
    window.localStorage.removeItem('email');
    this.router.navigate(['/login'])
  }
}
