import { UserType } from '../models/user-type.model';

export class LoggedUserDto {
    constructor() { }

    public id: number;
    public username: string;
    public userType: UserType;
    public token: string;
}
