import { UserType } from '../models/user-type.enum';

export class UserDisplayDataRequest {
    constructor(public userType: UserType, public userId: number) {}
}