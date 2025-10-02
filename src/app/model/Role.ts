export class RoleModel {
  RoleId: number;
  RoleName: string;
  RoleCode: string;
  ApplicationId: number;

  ParentRoleId?: number;
  Status: boolean;
  Order?: number;
}
export class RoleFilter {
  TextSearch: string;
  PageSize: number;
  PageNumber: number;
  ApplicationId: string;
  ColumnOrderBy?: string;
  TypeOrderBy?: string;
  IsGetCache?: boolean;

  constructor(
    textSearch: string, pageSize: number, pageNumber: number,
    applicationId: string, columnOrderBy?: string, typeOrderBy?: string, isGetCache?: boolean) {

    this.TextSearch = textSearch;
    this.PageSize = pageSize;
    this.PageNumber = pageNumber;
    this.ApplicationId = applicationId;
    this.ColumnOrderBy = columnOrderBy;
    this.TypeOrderBy = typeOrderBy;
    this.IsGetCache = isGetCache;
  }
}

