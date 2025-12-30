import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['./phone.page.scss'],
  imports: [IonButton, IonInput, IonLabel, IonItem, IonContent, FormsModule, CommonModule, NgIf],
})
export class PhonePage implements OnInit {
  userId = ''; // passato dal login
  phone = '';
  code = '';
  step: 'none' | 'sendOtp' | 'verifyOtp' = 'none';
  user: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';
    if (!this.userId) {
        // non trovato, torna al login
        this.router.navigate(['/login']);
        return;
    }

    // Recupera l'utente dal backend
    this.auth.getUser().subscribe({
      next: user => {
        this.user = user;
        if (user.phone && user.phoneVerified) {
          this.phone = user.phone;
          // Invia direttamente OTP
          this.auth.sendPhoneOtp(this.userId, this.phone).subscribe({
            next: () => this.step = 'verifyOtp',
            error: err => alert(err.error.message)
          });
        } 
        else 
        {
          this.step = 'sendOtp';
          this.phone = user.phone || '';
          console.log(this.step);
        }
      },
      error: err => console.log(err.error)
    });
  }

  sendOtp() {
    this.auth.setPhone(this.phone).subscribe({
      next: () => {
        this.auth.sendPhoneOtp(this.userId, this.phone).subscribe({
          next: () => this.step = 'verifyOtp',
          error: err => alert(err.error.message)
        });
      },
      error: err => alert(err.error.message)
    });
  }

  verifyOtp() {
    this.auth.verifyPhoneOtp(this.code).subscribe({
      next: () => {
        this.goToEmailStep(); // passa alla email facoltativa
      },
      error: err => alert(err.error.message)
    });
  }

  private goToEmailStep() {
    // Se l'email è già verificata, vai direttamente agli sconti
    if (this.user?.emailVerified) 
      this.router.navigate(['/tabs/discounts']);
    else 
      this.router.navigate(['/email']); // pagina email facoltativa
  }
}
