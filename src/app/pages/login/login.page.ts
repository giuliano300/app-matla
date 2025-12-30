import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { parseJwt } from 'src/main';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonButton, IonInput, IonLabel, IonItem, IonContent, FormsModule, CommonModule],
  providers: [AuthService]
})
export class LoginPage {
  unionNumber = '';
  idCardNumber = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.unionNumber, this.idCardNumber).subscribe({
      next: res => {
         localStorage.setItem('token', res.token);

        const payload = parseJwt(res.token);
        const userId = payload?.userId || payload?.sub; // dipende da come il backend lo chiama
        localStorage.setItem('userId', userId);
         this.router.navigate(['/phone']);
      },
      error: err => alert(err.error.message)
    });
  }
}
