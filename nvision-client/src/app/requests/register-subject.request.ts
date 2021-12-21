import { RegisterUserRequest } from './register-user.request';

export class RegisterSubjectRequest extends RegisterUserRequest{
    constructor() {
        super();
    }

    public username: string;
    public password: string;
    public repeatedPassword: string;
    public firstName: string;
    public lastName: string;
    public birthday: Date;
    public watcherId: number;
    public address: string;
    public isPatient: boolean;
    public sex: string;

    fromUser(user: RegisterUserRequest, watcherId: number, address: string, isPatient: boolean, sex: string): RegisterSubjectRequest {
        this.username = user.username;
        this.password = user.password;
        this.repeatedPassword = user.repeatedPassword;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.birthday = user.birthday;
        this.watcherId = watcherId;
        this.address = address;
        this.isPatient = isPatient;
        this.sex = sex;

        return this;
    }
}
