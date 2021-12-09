import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedUserDto } from '../dtos/logged-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { RegisterSubjectDto } from '../dtos/register-subject.dto';
import { RegisterWatcherDto } from '../dtos/register-watcher.dto';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly APIUrlDev = 'https://localhost:5001/api/authentication';
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
        return this.http.post<LoggedUserDto>(this.getApiUrl() + '/login', loginUserInformation);
    }

    registerWatcher(registerWatcher: RegisterWatcherDto): Observable<boolean> {
        return this.http.post<boolean>(this.getApiUrl() + '/register-watcher', registerWatcher);
    }

    registerSubject(registerSubject: RegisterSubjectDto): Observable<boolean> {
        return this.http.post<boolean>(this.getApiUrl() + '/register-subject', registerSubject);
    }
}
