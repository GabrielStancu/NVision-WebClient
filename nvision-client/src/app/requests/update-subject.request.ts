import  { WatcherOption } from './watcher-option.request'

export class UpdateSubjectRequest {
    constructor(public readonly id: number, public username: string,
                public password: string, public repeatedPassword: string,
                public firstName: string, public lastName: string,
                public birthday: Date, public profilePictureSrc: string,
                public watcherId: number, public watcherFullName: string,
                public address: string, public isPatient: boolean,
                public sex: string, public watchers: WatcherOption[]) {}
}