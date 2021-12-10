import { SensorMeasurement } from './sensor-measurement.model';

export class SubjectWithMeasurements{
    constructor() {
    }

    public id: number;
    public username: string;
    public firstName: string;
    public lastName: string;
    public birthday: Date;
    public watcherId: number;
    public address: string;
    public isPatient: boolean;
    public sensorMeasurements: SensorMeasurement[];
}
