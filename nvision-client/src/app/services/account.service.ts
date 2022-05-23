import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUserReply } from '../replies/login-user.reply';
import { UserDisplayDataReply } from '../replies/user-display-data.reply';
import { LoginUserRequest } from '../requests/login-user.request';
import { RegisterUserRequest } from '../requests/register-user.request';
import { UserDisplayDataRequest } from '../requests/user-display-data.request';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private readonly APIUrlDev = 'https://192.168.241.247:5001/api/account';
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

    uploadPhoto(val: any): any {
        return this.http.post(this.getApiUrl() + '/saveFile', val);
    }

    getUserDisplayData(userDisplayDataRequest: UserDisplayDataRequest): Observable<UserDisplayDataReply> {
        return this.http.post<UserDisplayDataReply>(this.getApiUrl() + '/displayData', userDisplayDataRequest);
    }

    getPhotosUrl(): string {
        return this.getApiUrl().replace('api/account', '') + 'ProfilePictures';
    }
}
