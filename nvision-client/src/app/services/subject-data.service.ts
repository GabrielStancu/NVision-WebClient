import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateSubjectRequest } from '../requests/update-subject.request';

@Injectable({
    providedIn: 'root'
})
export class SubjectDataService {
    private readonly APIUrlDev = 'https://localhost:5001/api/subject';
    private readonly APIUrlProd = '';

    private getApiUrl(): string {
        if (isDevMode()) {
            return this.APIUrlDev;
        } else {
            return this.APIUrlProd;
        }
    }

    constructor(private http: HttpClient) {}

    getWatcherProfileData(subjectId: number): Observable<UpdateSubjectRequest> {
        return this.http.get<UpdateSubjectRequest>(this.getApiUrl() + '/' + 'profile-data' + '/' + subjectId.toString());
    }

    saveChanges(subject: UpdateSubjectRequest): Observable<boolean> {
        if (subject.profilePictureSrc.includes('/')) {
            const domainLimit = subject.profilePictureSrc.lastIndexOf('/');
            subject.profilePictureSrc = subject.profilePictureSrc.substring(domainLimit + 1);
        }
        subject.watchers = [];
        return this.http.put<boolean>(this.getApiUrl() + '/' + 'save-changes', subject);
    }
}
