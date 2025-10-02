export class NoticationModel {
  Id: number;
  Name: string;
  Content: string;
  UserId: number;
  UserName: string;
  CreatedByUserId?: number;
  CreatedOnDate?: Date;
  LastModifiedByUserId?: number;
  LastModifiedOnDate?: Date;
  isView?: boolean;
  Type?: number;
}

export class NoticationFilter {
  TextSearch: string;
  PageSize: number;
  PageNumber: number;
  ColumnOrderBy?: string;
  TypeOrderBy?: string;
  Type?: number;
  IsGetCache?: boolean;

  constructor(
    textSearch: string,
    pageSize: number,
    pageNumber: number,
    columnOrderBy?: string,
    typeOrderBy?: string,
    type?: number,
    isGetCache?: boolean
  ) {
    this.TextSearch = textSearch;
    this.PageSize = pageSize;
    this.PageNumber = pageNumber;
    this.ColumnOrderBy = columnOrderBy;
    this.TypeOrderBy = typeOrderBy;
    this.Type = type;
    this.IsGetCache = isGetCache;
  }
}
