import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { api_url } from 'src/main';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = api_url;

    token: string | null = null;

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('token') || '';
    }

    private get headers(): HttpHeaders {
        return new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    }

    login(unionNumber: string, idCardNumber: string) {
        return this.http.post<any>(`${this.apiUrl}/auth/login`, { unionMembershipNumber: unionNumber, identityCardNumber: idCardNumber })
        .pipe(tap(res => this.token = res.token));
    }

    // ------------------- UTENTE -------------------
    getUser(): Observable<any> {
        return this.http.get(`${this.apiUrl}/users/me`, { headers: this.headers });
    }

    // ------------------- TELEFONO -------------------
    setPhone(phone: string) {
        return this.http.patch(`${this.apiUrl}/users/me/phone`, { phone }, { headers: this.headers });
    }

    sendPhoneOtp(userId: string, phone: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/otp/phone/send`, { userId, phone }, { headers: this.headers });
    }

    verifyPhoneOtp(code: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/otp/phone/verify`, { code }, { headers: this.headers });
    }

    // ------------------- EMAIL -------------------
    setEmail(email: string) {
        return this.http.patch(`${this.apiUrl}/users/me/email`, { email }, { headers: this.headers });
    }

    sendEmailOtp(userId: string, email: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/otp/email/send`, { userId, email }, { headers: this.headers });
    }

    verifyEmailOtp(code: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/otp/email/verify`, { code }, { headers: this.headers });
    }

}
