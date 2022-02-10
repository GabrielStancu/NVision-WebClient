import { UserType } from "../models/user-type.enum";

export class UpdateWatcherRequest {
    constructor(public readonly id: number, public username: string,
                public password: string, public repeatedPassword: string,
                public firstName: string, public lastName: string,
                public birthday: Date, public profilePictureSrc: string,
                public phoneNumber: string, public readonly userType: UserType = UserType.Watcher) {}
}