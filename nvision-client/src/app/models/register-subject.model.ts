import { UserType } from './user-type.model';
import { RegisterUser } from './register-user.model';

export class RegisterSubject extends RegisterUser{
    constructor() {
        super();
    }

    public readonly userType = UserType.Watcher;
    public watcherId: number;
    public address: string;
    public isPatient: boolean;

    fromUser(user: RegisterUser, watcherId: number, address: string, isPatient: boolean): RegisterSubject {
        this.username = user.username;
        this.password = user.password;
        this.repeatedPassword = user.repeatedPassword;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.birthday = user.birthday;
        this.watcherId = watcherId;
        this.address = address;
        this.isPatient = isPatient;

        return this;
    }
}
