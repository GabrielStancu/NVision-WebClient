import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from '../models/alert.model';
import { Subject } from '../models/subject.model';
import { WatcherDataReply } from '../replies/watcher-data.reply';
import { AlertAnswer } from '../requests/alert-answer.request';
import { UpdateWatcherRequest } from '../requests/update-watcher.request';

@Injectable({
    providedIn: 'root'
})
export class WatcherDataService {
    private readonly APIUrlDev = 'https://192.168.220.247:5001/api/watcher';
    private readonly APIUrlProd = '';

    private getApiUrl(): string {
        if (isDevMode()) {
            return this.APIUrlDev;
        } else {
            return this.APIUrlProd;
        }
    }

    constructor(private http: HttpClient) {}

    getWatcherData(watcherId: number): Observable<WatcherDataReply> {
        return this.http.get<WatcherDataReply>(this.getApiUrl() + '/' + watcherId.toString());
    }

    getWatcherAlerts(watcherId: number): Observable<Alert[]> {
        return this.http.get<Alert[]>(this.getApiUrl() + '/' + 'alerts' + '/' + watcherId.toString());
    }

    answerAlert(alertAnswer: AlertAnswer): Observable<boolean> {
        return this.http.post<boolean>(this.getApiUrl() + '/' + 'answer-alert', alertAnswer);
    }

    getWatcherSubjects(watcherId: number): Observable<Subject[]> {
        return this.http.get<Subject[]>(this.getApiUrl() + '/' + 'subjects' + '/' + watcherId.toString());
    }

    getWatcherProfileData(watcherId: number): Observable<UpdateWatcherRequest> {
        return this.http.get<UpdateWatcherRequest>(this.getApiUrl() + '/' + 'profile-data' + '/' + watcherId.toString());
    }

    saveChanges(watcher: UpdateWatcherRequest): Observable<boolean> {
        if (watcher.profilePictureSrc.includes('/')) {
            const domainLimit = watcher.profilePictureSrc.lastIndexOf('/');
            watcher.profilePictureSrc = watcher.profilePictureSrc.substring(domainLimit + 1);
        }
        return this.http.put<boolean>(this.getApiUrl() + '/' + 'save-changes', watcher);
    }
}
