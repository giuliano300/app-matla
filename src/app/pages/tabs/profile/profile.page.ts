import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList } from "@ionic/angular/standalone";
import { DiscountService } from 'src/app/services/discount.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  imports: [IonList, IonItem, IonContent, IonTitle, IonToolbar, IonHeader, CommonModule],
})
export class ProfilePage implements OnInit {
  discounts: any[] = [];

  constructor(private auth: AuthService, private discountService: DiscountService) {}

  ngOnInit() {
    this.discountService.getDiscounts(this.auth.token!).subscribe((data)=>{
        this.discounts = data;
    })
  }
}
