import { MeasurementReply } from './measurement.reply';
import { SummarizedSubjectReply } from './summarized-subject.reply';

export class SubjectDataReply {
    constructor(public measurements: MeasurementReply[], public summarizedDataDto: SummarizedSubjectReply) { }
}
