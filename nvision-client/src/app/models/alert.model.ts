export class Alert {
    constructor() { }

    public subjectId: number;
    public subjectName: string;
    public timestamp: Date;
    public message: string;
    public wasTrueAlert: boolean | undefined;
}
