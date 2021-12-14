import { RegisterUser } from './register-user.model';

export class RegisterSubject extends RegisterUser{
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

    fromUser(user: RegisterUser, watcherId: number, address: string, isPatient: boolean, sex: string): RegisterSubject {
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
