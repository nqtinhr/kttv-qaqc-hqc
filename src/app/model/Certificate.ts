export class CertificateModel {
  CertificateId: number;
  Code: string;
  Name: string;
  ApplicationId?: number;
  SerialNumber: string;
  OwnCA: string;
  OrganizationCA: string;
  ValidFrom?: Date;
  ValidTo?: Date;
  CreatedByUserId?: number;
  CreatedOnDate?: Date;
  LastModifiedByUserId?: number;
  LastModifiedOnDate?: Date;
  Status?: number;
  CertStatus?: number;
  Order?: number;
  Position: string;
  Email: string;
  Phone: string;
  Contact: string;
}
export class CertificateFilter {
  TextSearch: string;
  PageSize: number;
  PageNumber: number;
  ColumnOrderBy?: string;
  TypeOrderBy?: string;
  IsGetCache?: boolean;

  constructor(
    textSearch: string,
    pageSize: number,
    pageNumber: number,
    columnOrderBy?: string,
    typeOrderBy?: string,
    isGetCache?: boolean
  ) {
    this.TextSearch = textSearch;
    this.PageSize = pageSize;
    this.PageNumber = pageNumber;
    this.ColumnOrderBy = columnOrderBy;
    this.TypeOrderBy = typeOrderBy;
    this.IsGetCache = isGetCache;
  }
}
