export class SystemParameterModel {
  Id: number;
  Code: string;
  Value: string;
  Description: string;
  ApplicationId: number;
  Status: number;
  Order?: number;
  isAllowdelete?: boolean;
  isAllowedit?: boolean;
}
export class SystemParameterFilter {
  TextSearch: string;
  PageSize: number;
  PageNumber: number;
  ApplicationId?: number;
  ColumnOrderBy?: string;
  TypeOrderBy?: string;
  IsGetCache?: boolean;

  constructor(
    textSearch: string, pageSize: number, pageNumber: number,
    applicationId?: number, columnOrderBy?: string, typeOrderBy?: string, isGetCache?: boolean) {

    this.TextSearch = textSearch;
    this.PageSize = pageSize;
    this.PageNumber = pageNumber;
    this.ApplicationId = applicationId;
    this.ColumnOrderBy = columnOrderBy;
    this.TypeOrderBy = typeOrderBy;
    this.IsGetCache = isGetCache;
  }
}

