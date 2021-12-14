import { Alert } from './alert.model';
import { SubjectWithoutMeasurements } from './subject-without-measurements.model';

export class WatcherHomepageData {
    constructor() { }

    public subjects: SubjectWithoutMeasurements[];
    public subjectsCount: number;
    public alerts: Alert[];
}
