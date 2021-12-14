import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectWithMeasurements } from '../models/subject-with-measurements.model';
import { SubjectWithoutMeasurements } from '../models/subject-without-measurements.model';
import { WatcherHomepageData } from '../models/watcher-homepage-data.model';

@Injectable({
    providedIn: 'root'
})
export class WatcherSubjectsService {
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

    getWatcherHomepageData(watcherId: number): Observable<WatcherHomepageData> {
        return this.http.get<WatcherHomepageData>(this.getApiUrl() + '/' + watcherId.toString());
    }

    getSubjectWithMeasurements(subjectId: number): Observable<SubjectWithMeasurements> {
        return this.http.get<SubjectWithMeasurements>(this.getApiUrl() + '/subject/' + subjectId.toString());
    }
}
