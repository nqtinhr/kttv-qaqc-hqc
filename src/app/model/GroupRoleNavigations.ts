export class GroupRoleNavigationsModel {
  GroupRoleId: number;
  NavigationId: number;
  GroupRoleName: string;
  GroupRoleCode: string;
  NavigationCode: string;
  NavigationName: string;
  ApplicationId: number;
  Checked: boolean = false;
}
export class GroupRoleNavigationsFilter {
  TextSearch: string;
  PageSize: number;
  PageNumber: number;
  ApplicationId?: number;
  ColumnOrderBy?: string;
  TypeOrderBy?: string;
  IsGetCache?:boolean;
}

