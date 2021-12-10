import { SensorType } from './sensor-type.enum';

export class SensorMeasurement{
    constructor() {
    }

    public id: number;
    public subjectId: number;
    public value: number;
    public timestamp: Date;
    public sensorType: SensorType;
    public sensorName: string;
}
