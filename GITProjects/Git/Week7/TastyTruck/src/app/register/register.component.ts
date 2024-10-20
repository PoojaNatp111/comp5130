import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  firstname: string = '';
  lastname: string = '';
  username: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService) {}

  register() {
    if (this.username === 'admin' && this.password === 'password') {
      this.userService.setUsername(this.username);
      this.router.navigate(['/Home']);
      
    } else {
      alert('Invalid username or password');
    }
  }
}
