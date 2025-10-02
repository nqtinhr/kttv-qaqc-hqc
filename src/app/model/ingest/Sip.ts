export class SipModel {
  Id: number;
  Uuid: string;
  Name: string;
  SipType: string;
  Status: number;
  TransferType: string;
  Order: number;
  FileSize: number;
  ExpiredDate: Date;
  IsEncrypt: boolean;
  RelativePath: string;
  FileName: string;
  IsUuid: boolean;
  IsCheckSum: boolean;
  CreatedByUserId?: number;
  CreatedOnDate?: Date;
  LastModifiedByUserId?: number;
  LastModifiedOnDate?: Date;
}
export class SipFilter {
  TextSearch: string;
  PageSize: number;
  PageNumber: number;
  ColumnOrderBy?: string;
  TypeOrderBy?: string;
  Type? : number;

  constructor(
    textSearch: string, pageSize: number, pageNumber: number,
    columnOrderBy?: string, typeOrderBy?: string, Type? : number) {

    this.TextSearch = textSearch;
    this.PageSize = pageSize;
    this.PageNumber = pageNumber;
    this.ColumnOrderBy = columnOrderBy;
    this.TypeOrderBy = typeOrderBy;
    this.Type = Type;
  }
}

