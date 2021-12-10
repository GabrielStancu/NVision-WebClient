import { UserType } from './user-type.model';

export class LoggedUser {
    constructor() { }

    public id: number;
    public username: string;
    public userType: UserType;
    public token: string;
}
