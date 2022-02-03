export class Alert {
    constructor() { }

    public id: number;
    public subjectId: number;
    public subjectName: string;
    public timestamp: Date;
    public message: string;
    public wasTrueAlert: boolean | undefined;
}
