import { UserType } from '../models/user-type.model';

export class LoginUserReply {
    constructor() { }

    public id: number;
    public username: string;
    public userType: UserType;
    public token: string;
}
