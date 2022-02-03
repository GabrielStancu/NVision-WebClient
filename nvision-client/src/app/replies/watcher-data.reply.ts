export class WatcherDataReply {
    constructor(public cards: WatcherCardReply[],
                public subjects: WatcherSubjectReply[],
                public alerts: WatcherAlertReply[]) { }
}

export class WatcherCardReply {
    constructor(public numericValue: number, public propertyName: string) { }
}

export class WatcherSubjectReply {
    constructor(public name: string, public healthStatus: string) { }
}

export class WatcherAlertReply {
    constructor(public id: number, public subjectId: number, public subjectName: string,
                public message: string, public timestamp: Date, public wasTrueAlert: boolean) { }
}
