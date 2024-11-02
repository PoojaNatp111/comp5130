import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  cardDetails = {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
  };

  constructor(private router: Router) {}

  processPayment(): void {
   
      alert('Payment successful!');
      this.router.navigate(['/confirmation']); 
  }
}
