import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectDataReply } from '../replies/subject-data.reply';
import { SubjectDataRequest } from '../requests/subject-data.request';

@Injectable({
    providedIn: 'root'
})
export class WatcherSubjectsService {
    private readonly APIUrlDev = 'https://localhost:5001/api/data';
    private readonly APIUrlProd = '';

    private getApiUrl(): string {
        if (isDevMode()) {
            return this.APIUrlDev;
        } else {
            return this.APIUrlProd;
        }
    }

    constructor(private http: HttpClient) {}

    public getSubjectData(subjectDataRequest: SubjectDataRequest): Observable<SubjectDataReply> {
        return this.http.post<SubjectDataReply>(this.getApiUrl() + '/subject', subjectDataRequest);
    }
}
