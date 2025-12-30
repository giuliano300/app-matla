import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api_url } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private apiUrl = api_url;

  token: string | null = null;

  constructor(private http: HttpClient) {}

  getDiscounts(token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/discounts/me`, { headers });
  }

  useDiscount(id: string) {
    return this.http.post(`${this.apiUrl}/discounts/${id}/use`, {});
  }
}
