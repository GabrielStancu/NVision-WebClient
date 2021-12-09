import { UserType } from '../models/user-type.model';
import { RegisterUserDto } from './register-user.dto';

export class RegisterWatcherDto extends RegisterUserDto {
    constructor() {
        super();
    }

    public readonly userType = UserType.Watcher;
    public phoneNumber: string;

    fromUser(user: RegisterUserDto, phoneNumber: string): RegisterWatcherDto {
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
