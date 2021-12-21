import { UserType } from '../models/user-type.model';
import { RegisterUserRequest } from './register-user.request';

export class RegisterWatcherRequest extends RegisterUserRequest {
    constructor() {
        super();
    }

    public username: string;
    public password: string;
    public repeatedPassword: string;
    public firstName: string;
    public lastName: string;
    public birthday: Date;
    public readonly userType = UserType.Watcher;
    public phoneNumber: string;

    fromUser(user: RegisterUserRequest, phoneNumber: string): RegisterWatcherRequest {
        this.username = user.username;
        this.password = user.password;
        this.repeatedPassword = user.repeatedPassword;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.birthday = user.birthday;
        this.phoneNumber = phoneNumber;

        return this;
    }
}
