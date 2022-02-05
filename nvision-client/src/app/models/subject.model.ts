import { UserType } from './user-type.enum';

export class Subject {
    constructor() {}

    public id: number;
    public firstName: string;
    public lastName: string;
    public fullName: string;
    public birthday: Date;
    public address: string;
    public watcherId: number;
    public userType: UserType;
    public isPatient: boolean;
    public sex: string;
    public healthStatus: string;
    public profilePictureSrc: string;
}