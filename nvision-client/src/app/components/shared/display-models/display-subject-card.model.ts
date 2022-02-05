import { Subject } from "src/app/models/subject.model";

export class DisplaySubjectCard {
    constructor() {}

    public id: number;
    public fullName: string;
    public address: string;
    public birthday: Date;
    public isPatient: string;
    public sex: string;
    public healthStatus: string;
    public profilePictureSrc: string;

    public fromSubject(subject: Subject): DisplaySubjectCard {
        this.id = subject.id;
        this.fullName = subject.fullName;
        this.address = subject.address;
        this.birthday = subject.birthday;
        this.isPatient = subject.isPatient ? 'Yes' : 'No';
        this.sex = subject.sex === 'M' ? 'Male' : 'Female';
        this.healthStatus = subject.healthStatus;
        this.profilePictureSrc = subject.isPatient ? "./assets/patient.png" : "./assets/grandfather.png";

        return this;
    }
}