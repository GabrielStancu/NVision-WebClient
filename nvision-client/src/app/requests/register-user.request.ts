import { UserType } from '../models/user-type.enum';

export class RegisterUserRequest {
    constructor() { }

    public username: string;
    public password: string;
    public repeatedPassword: string;
    public firstName: string;
    public lastName: string;
    public birthday: Date;
    public userType: UserType;
}
