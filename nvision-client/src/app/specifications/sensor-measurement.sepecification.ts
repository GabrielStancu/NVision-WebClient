import { SensorType } from '../models/sensor-type.enum';

export class SensorMeasurementSpecification {
    constructor(public pageNumber: number, public pageSize: number,
                public startDate: Date, public endDate: Date,
                public sensorType: SensorType) {}
}
