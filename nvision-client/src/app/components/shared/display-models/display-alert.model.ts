export class DisplayAlert{
    constructor(public id: number, public subjectName: string, public message: string,
                public timestamp: Date, public status: string, public className: string,
                public shortMessage: string, public displayDate: string) {
    }
}
