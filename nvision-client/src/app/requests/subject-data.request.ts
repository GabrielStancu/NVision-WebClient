import { SensorType } from '../models/sensor-type.enum';
import { SensorMeasurementSpecification } from '../specifications/sensor-measurement.sepecification';

export class SubjectDataRequest {
    constructor(subjectId: number, pageNumber: number, pageSize: number,
                startDate: Date, endDate: Date, sensorType: SensorType) {
                    this.subjectId = subjectId;
                    this.sensorSpecificationDto =
                        new SensorMeasurementSpecification(pageNumber, pageSize, startDate, endDate, sensorType);
                }
    public subjectId: number;
    public sensorSpecificationDto: SensorMeasurementSpecification;
}
