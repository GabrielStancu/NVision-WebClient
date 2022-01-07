export class DashboardAlert{
    constructor(public name: string, public message: string, public timestamp: Date,
                public wasAccurate: boolean, public className: string) {
    }
}
