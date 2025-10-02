export class JobModel {
  Id: number;
  Code: string;
  JobTypeId: number;
  Directory: string;
  FileType: string;
  FileId: number;
  Status: number;
  CreatedTimeDec: number;
  Description: string;
  CreatedByUserId?: number;
  CreatedOnDate?: Date;
  LastModifiedByUserId?: number;
  LastModifiedOnDate?: Date;
}
export class JobFilter {
  TextSearch: string;
  PageSize: number;
  PageNumber: number;
  ColumnOrderBy?: string;
  TypeOrderBy?: string;

  constructor(
    textSearch: string, pageSize: number, pageNumber: number,
    columnOrderBy?: string, typeOrderBy?: string) {

    this.TextSearch = textSearch;
    this.PageSize = pageSize;
    this.PageNumber = pageNumber;
    this.ColumnOrderBy = columnOrderBy;
    this.TypeOrderBy = typeOrderBy;
  }
}

