import { UserType } from '../models/user-type.model';
import { RegisterUserDto } from './register-user.dto';

export class RegisterSubjectDto extends RegisterUserDto{
    constructor() {
        super();
    }

    public readonly userType = UserType.Watcher;
    public watcherId: number;
    public address: string;
    public isPatient: boolean;

    fromUser(user: RegisterUserDto, watcherId: number, address: string, isPatient: boolean): RegisterSubjectDto {
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
