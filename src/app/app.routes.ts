import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'phone',
    loadComponent: () => import('./pages/phone/phone.page').then(m => m.PhonePage),
  },
  {
    path: 'email',
    loadComponent: () => import('./pages/email/email.page').then(m => m.EmailPage),
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'discounts',
        loadComponent: () => import('./pages/tabs/discounts/discounts.page').then(m => m.DiscountsPage),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/tabs/profile/profile.page').then(m => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: 'discounts',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
