export class SidebarOption{
    constructor(public title: string, public iconName: string,
                public componentName: string, public isLogOutOption: boolean = false,
                public isActive: boolean = false) {
    }
}
