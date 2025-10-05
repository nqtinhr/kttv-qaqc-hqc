export class PressureModel {
  StationNo: string;
  StationNameVn: string;
  Value: number;
  DtDate: Date;
  QCFlag: number;
}

export class PressureFilter {
  TextSearch: string;
  Factor?: string;
  DtDate?: string;
  PageSize: number;
  PageNumber: number;
  ColumnOrderBy?: string;
  TypeOrderBy?: string;
  IsGetCache?: boolean;

  constructor(
    textSearch: string,
    pageSize: number,
    pageNumber: number,
    factor?: string,
    dtDate?: string,
    columnOrderBy?: string,
    typeOrderBy?: string,
    isGetCache?: boolean
  ) {
    this.TextSearch = textSearch;
    this.Factor = factor;
    this.DtDate = dtDate;
    this.PageSize = pageSize;
    this.PageNumber = pageNumber;
    this.ColumnOrderBy = columnOrderBy;
    this.TypeOrderBy = typeOrderBy;
    this.IsGetCache = isGetCache;
  }
}
