import { Alert } from "../../../models/alert.model";
import { ISpecification } from "../specification.interface";

export class AlertDateSpecification implements ISpecification<Alert> {
    
    constructor(private startDate: Date, private endDate: Date) {}

    isSatisfied(t: Alert): boolean {
        if (this.startDate === null || this.startDate === undefined) 
            return true;
        if (this.endDate === null || this.endDate === undefined) 
            return true;
        return this.isDateInRange(t.timestamp, this.startDate, this.endDate);
    }

    private isDateInRange(crtDate: Date, startDate: Date, endDate: Date): boolean {
        const afterStart = Date.parse(crtDate.toString()) >= Date.parse(startDate.toString());
        const beforeEnd = Date.parse(crtDate.toString()) <= Date.parse(endDate.toString());
        return  afterStart && beforeEnd;
    }
}