import { Alert } from 'src/app/models/alert.model';
import { ISpecification } from '../specification.interface';

export class AlertSubjectSpecification implements ISpecification<Alert> {

    constructor(private subjectName: string) {}

    isSatisfied(t: Alert): boolean {
        if (this.subjectName === 'all') {
            return true;
        }
        return this.subjectName.includes(t.subjectName);
    }
}
