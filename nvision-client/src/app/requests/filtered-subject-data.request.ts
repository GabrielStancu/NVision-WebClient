import { SensorType } from '../models/sensor-type.enum';

export class FilteredSubjectDataRequest {
    constructor(public subjectId: number, public sensorTypes: SensorType[],
                public startDate: Date, public endDate: Date) { }
}
