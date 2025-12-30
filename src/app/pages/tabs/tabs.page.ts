import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonLabel, RouterModule, CommonModule, FormsModule],
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom" color="light">
        <ion-tab-button routerLink="/tabs/profile" [routerLinkActive]="'tab-selected'">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
            <path d="M4 20c0-4 8-4 8-4s8 0 8 4" stroke="currentColor" stroke-width="2"/>
          </svg>
          <ion-label>Profile</ion-label>
        </ion-tab-button>

        <ion-tab-button routerLink="/tabs/discounts" [routerLinkActive]="'tab-selected'">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16v16H4z" stroke="currentColor" stroke-width="2"/>
            <path d="M4 4l16 16" stroke="currentColor" stroke-width="2"/>
          </svg>
          <ion-label>Discounts</ion-label>
        </ion-tab-button>

        <ion-tab-button (click)="logout()">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 17l5-5-5-5" stroke="currentColor" stroke-width="2"/>
            <path d="M21 12H9" stroke="currentColor" stroke-width="2"/>
            <path d="M9 19V5" stroke="currentColor" stroke-width="2"/>
          </svg>
          <ion-label>Logout</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>`,
    styles: [`
      ion-tab-button svg {
        display: block;
        margin: 0 auto 4px auto;
        width: 24px;
        height: 24px;
      }

      .tab-selected svg {
        color: #3880ff;
      }`
    ]
})
export class TabsPage {
  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
