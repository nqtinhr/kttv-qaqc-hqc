export class SpaceModel {
  Id: number;
  Name: string;
  Uuid: string;
  Accessprotocol: string;
  Size: number;
  Path: string;
  StagingPath: string;
  Verified: boolean;
  Status: number;
  Order?: number;
  disabled: any;
}
export class SpaceFilter {
  TextSearch: string;
  PageSize: number;
  PageNumber: number;
  ColumnOrderBy?: string;
  TypeOrderBy?: string;
  IsGetCache?: boolean;

  constructor(
    textSearch: string, pageSize: number, pageNumber: number,
    columnOrderBy?: string, typeOrderBy?: string, isGetCache?: boolean) {

    this.TextSearch = textSearch;
    this.PageSize = pageSize;
    this.PageNumber = pageNumber;
    this.ColumnOrderBy = columnOrderBy;
    this.TypeOrderBy = typeOrderBy;
    this.IsGetCache = isGetCache;
  }
}

