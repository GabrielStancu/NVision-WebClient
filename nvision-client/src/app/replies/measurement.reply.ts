import { SensorType } from '../models/sensor-type.enum';

export class MeasurementReply {
    public constructor(public id: number, public sensorName: string,
                       public sensorType: SensorType, public subjectId: number,
                       public timestamp: Date, public value: number) {}
}