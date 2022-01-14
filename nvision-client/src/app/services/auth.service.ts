import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUserReply } from '../replies/login-user.reply';
import { LoginUserRequest } from '../requests/login-user.request';
import { RegisterUserRequest } from '../requests/register-user.request';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly APIUrlDev = 'https://localhost:5001/api/authentication';
    private readonly APIUrlProd = '';

    private getApiUrl(): string {
        if (isDevMode()) {
            return this.APIUrlDev;
        } else {
            return this.APIUrlProd;
        }
    }

    constructor(private http: HttpClient) {}

    loginUser(loginUserInformation: LoginUserRequest): Observable<LoginUserReply> {
        return this.http.post<LoginUserReply>(this.getApiUrl() + '/login', loginUserInformation);
    }

    registerUser(registerUser: RegisterUserRequest): Observable<boolean> {
        return this.http.post<boolean>(this.getApiUrl() + '/register', registerUser);
    }
}
