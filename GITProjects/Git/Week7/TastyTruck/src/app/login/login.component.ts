import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService) {}

  login() {
    if (this.username === 'admin' && this.password === 'password') {
      this.userService.setUsername(this.username);
      this.router.navigate(['/Home']);
      
    } else {
      alert('Invalid username or password');
    }
  }
}
