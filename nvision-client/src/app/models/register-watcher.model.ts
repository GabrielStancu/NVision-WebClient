import { UserType } from './user-type.model';
import { RegisterUser } from './register-user.model';

export class RegisterWatcher extends RegisterUser {
    constructor() {
        super();
    }

    public readonly userType = UserType.Watcher;
    public phoneNumber: string;

    fromUser(user: RegisterUser, phoneNumber: string): RegisterWatcher {
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