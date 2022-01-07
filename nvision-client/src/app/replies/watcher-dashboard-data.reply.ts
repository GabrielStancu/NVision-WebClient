export class WatcherDashboardDataReply {
    constructor(public cards: WatcherDashboardCardReply[],
                public subjects: WatcherDashboardSubjectReply[],
                public alerts: WatcherDashboardAlertReply[]) { }
}

export class WatcherDashboardCardReply {
    constructor(public numericValue: number, public propertyName: string) { }
}

export class WatcherDashboardSubjectReply {
    constructor(public name: string, public healthStatus: string) { }
}

export class WatcherDashboardAlertReply {
    constructor(public subjectId: number, public subjectName: string, public message: string,
                public timestamp: Date, public wasAccurate: boolean) { }
}
