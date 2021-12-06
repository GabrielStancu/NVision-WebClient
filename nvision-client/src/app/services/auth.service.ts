import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedUserDto } from '../dtos/logged-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly APIUrlDev = 'https://localhost:5001/api/authentication/login';
    readonly APIUrlProd = '';

    getApiUrl(): string {
        if (isDevMode()) {
            return this.APIUrlDev;
        } else {
            return this.APIUrlProd;
        }
    }

    constructor(private http: HttpClient) {}

    loginUser(loginUserInformation: LoginUserDto): Observable<LoggedUserDto> {
        return this.http.post<LoggedUserDto>(this.getApiUrl(), loginUserInformation);
    }
}
