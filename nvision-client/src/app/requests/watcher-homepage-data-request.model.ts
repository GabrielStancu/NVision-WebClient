import { AlertSpecification } from '../specifications/alert.specification';
import { SubjectSpecification } from '../specifications/subject.specification';

export class WatcherHomepageDataRequest {
    constructor(watcherId: number, subjectPageNumber: number, subjectPageSize: number,
                subjectName: string, alertPageNumber: number, alertPageSize: number) {
                    this.watcherId = watcherId;
                    this.subjectSpecificationDto = new SubjectSpecification(subjectPageNumber, subjectPageSize, subjectName);
                    this.alertSpecificationDto = new AlertSpecification(alertPageNumber, alertPageSize);
                }
    public watcherId: number;
    public subjectSpecificationDto: SubjectSpecification;
    public alertSpecificationDto: AlertSpecification;
}
