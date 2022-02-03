import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from '../models/alert.model';
import { WatcherDataReply } from '../replies/watcher-data.reply';
import { AlertAnswer } from '../requests/alert-answer.request';

@Injectable({
    providedIn: 'root'
})
export class WatcherDataService {
    private readonly APIUrlDev = 'https://localhost:5001/api/watcher';
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
}
