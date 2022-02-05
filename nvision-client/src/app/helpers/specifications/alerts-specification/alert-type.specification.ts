import { Alert } from "../../../models/alert.model";
import { ISpecification } from "../specification.interface";

export class AlertTypeSpecification implements ISpecification<Alert> {
    
    constructor(private type: string) {}

    isSatisfied(t: Alert): boolean {
        if (this.type.includes('all'))
            return true;
        if (this.type.includes('yes') && t.wasTrueAlert)
            return true;
        if (this.type.includes('no') && t.wasTrueAlert === false)
            return true;
        if (this.type.includes('na') && t.wasTrueAlert === null)
            return true;
        return false;
    }
    
}