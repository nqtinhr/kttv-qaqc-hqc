export class GroupRoleModel {
  GroupRoleId: number;
  GroupRoleName: string;
  GroupRoleCode: string;
  ApplicationId: number;

  ParentGroupRoleId?: number;
  Status?: boolean;
  Order?: number;
}
export class GroupRoleFilter {
  TextSearch: string;
  PageSize: number;
  PageNumber: number;
  ApplicationId?: number;
  ColumnOrderBy?: string;
  TypeOrderBy?: string;
  IsGetCache?: boolean;
  IsReversed?: boolean | null;
}

