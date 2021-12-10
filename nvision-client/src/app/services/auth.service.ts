import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedUser } from '../models/logged-user.model';
import { LoginUser } from '../models/login-user.model';
import { RegisterSubject } from '../models/register-subject.model';
import { RegisterWatcher } from '../models/register-watcher.model';

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

    loginUser(loginUserInformation: LoginUser): Observable<LoggedUser> {
        return this.http.post<LoggedUser>(this.getApiUrl() + '/login', loginUserInformation);
    }

    registerWatcher(registerWatcher: RegisterWatcher): Observable<boolean> {
        return this.http.post<boolean>(this.getApiUrl() + '/register-watcher', registerWatcher);
    }

    registerSubject(registerSubject: RegisterSubject): Observable<boolean> {
        return this.http.post<boolean>(this.getApiUrl() + '/register-subject', registerSubject);
    }
}
