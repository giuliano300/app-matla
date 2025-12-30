import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-email',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],  
  imports: [IonButton, IonInput, IonLabel, IonItem, IonContent, FormsModule, CommonModule, NgIf]
})
export class EmailPage implements OnInit {
  userId = '';
  email = '';
  code = '';
  step: 'sendOtp' | 'verifyOtp' | 'none' = 'sendOtp';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';
    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.auth.getUser().subscribe({
      next: user => {
        if (user.emailVerified) {
          this.router.navigate(['/discounts']);
        } else {
          this.email = user.email || '';
          this.step = 'sendOtp';
        }
      }
    });
  }

  sendOtp() {
    this.auth.setEmail(this.email).subscribe(() => {
      this.auth.sendEmailOtp(this.userId, this.email).subscribe(() => {
        this.step = 'verifyOtp';
      });
    });
  }

  verifyOtp() {
    this.auth.verifyEmailOtp(this.code).subscribe(() => {
      //alert('Email verificata!');
      this.router.navigate(['/tabs/discounts']);
    });
  }

  skip(){
    this.router.navigate(['/tabs/discounts']);
  }
}
