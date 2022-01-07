import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from '../models/alert.model';
import { SubjectDataReply } from '../replies/subject-data.reply';
import { WatcherDashboardDataReply } from '../replies/watcher-dashboard-data.reply';
import { AlertAnswerRequest } from '../requests/alert-answer.request';
import { SubjectDataRequest } from '../requests/subject-data.request';
import { WatcherHomepageDataRequest } from '../requests/watcher-homepage-data-request.model';

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

    getWatcherDashboardData(watcherId: number): Observable<WatcherDashboardDataReply> {
        return this.http.get<WatcherDashboardDataReply>(this.getApiUrl() + '/' + watcherId.toString());
    }

    getSubjectWithMeasurements(subjectDataRequest: SubjectDataRequest): Observable<SubjectDataReply> {
        return this.http.post<SubjectDataReply>(this.getApiUrl() + '/subject', subjectDataRequest);
    }

    answerAlert(alertAnswerRequest: AlertAnswerRequest): Observable<Alert> {
        return this.http.post<Alert>(this.getApiUrl() + '/alert', alertAnswerRequest);
    }
}
