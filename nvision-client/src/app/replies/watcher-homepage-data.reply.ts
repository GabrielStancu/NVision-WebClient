import { Alert } from '../models/alert.model';
import { SubjectWithoutMeasurements } from '../models/subject-without-measurements.model';

export class WatcherHomepageDataReply {
    constructor() { }

    public subjects: SubjectWithoutMeasurements[];
    public subjectsCount: number;
    public alerts: Alert[];
}
