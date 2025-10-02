export class UserInUserGroup{
    UserId : number
    FullName : string
    UserName : string
    GroupRoleId : number
    GroupRoleCode : string
    GroupRoleName : string
}

export class UserNotInUserGroup{
    UserId : number
    FullName : string
    UserName : string
}

export class UserGroupRoleFilter {
    TextSearch: string;
    PageSize: number;
    PageNumber: number;
    GroupRoleId?: number;
    ColumnOrderBy?: string;
    TypeOrderBy?: string;
    IsGetCache?: boolean;
    Type: boolean;
}

export class UserNotGroupFilter {
    TextSearch: string;
    PageSize: number;
    PageNumber: number;
    GroupRoleId?: number;
    ColumnOrderBy?: string;
    TypeOrderBy?: string;
    IsGetCache?: boolean;
    Type: boolean;
}