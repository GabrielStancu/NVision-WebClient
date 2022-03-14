export class SummarizedSubjectReply {
    public constructor(public id: number, public fullName: string,
                       public birthday: Date, public healthStatus: string,
                       public isPatient: boolean, public profilePrictureSrc: string) {}
}