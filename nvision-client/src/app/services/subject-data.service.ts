import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectDataReply } from '../replies/subject-data.reply';
import { FilteredSubjectDataRequest } from '../requests/filtered-subject-data.request';
import { UpdateDeviceSerialNumberRequest } from '../requests/update-device-serial-number.request';
import { UpdateSubjectRequest } from '../requests/update-subject.request';

@Injectable({
    providedIn: 'root'
})
export class SubjectDataService {
    private readonly APIUrlDev = 'https://192.168.241.247:5001/api/subject';
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

    getMeasurementsData(request: FilteredSubjectDataRequest): Observable<SubjectDataReply> {
        return this.http.post<SubjectDataReply>(this.getApiUrl(), request);
    }

    updateDeviceSerialNumber(request: UpdateDeviceSerialNumberRequest): Observable<boolean> {
        return this.http.post<boolean>(this.getApiUrl() + '/' + 'serial-number', request);
    }
}
