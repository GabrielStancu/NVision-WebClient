import { UserType } from "./user-type.enum";

export class Watcher {
    constructor() {}

    public id: number;
    public firstName: string;
    public lastName: string;
    public fullName: string;
    public birthday: Date;
    public userType: UserType;
    public profilePictureSrc: string;
    public phoneNumber: string;
}