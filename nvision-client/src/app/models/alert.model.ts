export class Alert {
    constructor() { }

    public subjectId: number;
    public watcherId: number;
    public alertMoment: Date;
    public message: string;
    public wasTrueAlert: boolean | undefined;
}
