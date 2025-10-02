export class LocationModel {
  LocationId: number;
  LocationName: string;
  LocationCode: string;
  Status: number;
  Order?: number;
  CountryId: number;
  CountryName: string;
  CreatedByUserId?: number;
  CreatedOnDate?: Date;
  LastModifiedByUserId?: number;
  LastModifiedOnDate?: Date;
}
export class LocationFilter {
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

