export class TransferModel {
  Id: number;
  Uuid: string;
  Name: string;
  TransferType: string;
  CompleteOnDate? : Date;
  Status: number;
  Order: number;
  FileSize: number;
  ExpiredDate: Date;
  IsEncrypt: boolean;
  RelativePath: string;
  FileName: string;
  CurrentVersion: string;
  IsPreview: boolean;
  IsCheckSum: boolean;
  CreatedByUserId?: number;
  CreatedOnDate?: Date;
  LastModifiedByUserId?: number;
  LastModifiedOnDate?: Date;
}

export class TransferFilter {
  TextSearch: string;
  PageSize: number;
  PageNumber: number;
  ColumnOrderBy?: string;
  TypeOrderBy?: string;
  Type?: number;
  IsGetCache?: boolean;
  IsEncryptSearch?: boolean;

  constructor(
    textSearch: string, pageSize: number, pageNumber: number,
    columnOrderBy?: string, typeOrderBy?: string, isEncryptSearch?: boolean, type?: number, isGetCache?: boolean) {

    this.TextSearch = textSearch;
    this.PageSize = pageSize;
    this.PageNumber = pageNumber;
    this.ColumnOrderBy = columnOrderBy;
    this.TypeOrderBy = typeOrderBy;
    this.Type = type;
    this.IsEncryptSearch = isEncryptSearch;
    this.IsGetCache = isGetCache;
  }
}

export class TransferStartModel {
  IsEncrypt: boolean;
  JobTypeCode: string;
  JobTypeId: number;
  Priority: number;
  Status: number;
  TransferId: number;
  TransferName: string;
  TransferUuid: any;
}

