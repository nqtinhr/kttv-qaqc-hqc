export class PreIngestModel {
    WarehouseId: number;
    WarehouseCode: string;
    WarehouseName: string;
    Address: string;
    Description: string;
    Status: number;
    UserId: number;
    UserName: string;
    CreatedByUserId?: number;
    CreatedOnDate?: Date;
    LastModifiedByUserId?: number;
    LastModifiedOnDate?: Date;
  }

  export class PreIngestFilter {
    TextSearch: string;
    PageSize: number;
    PageNumber: number;
    RecordCollectionId : number;
    ColumnOrderBy?: string;
    TypeOrderBy?: string;
    IsGetCache?: boolean;

    constructor(
      textSearch: string, pageSize: number, pageNumber: number, recordCollectionId : number,
      columnOrderBy?: string, typeOrderBy?: string, isGetCache?: boolean) {

      this.TextSearch = textSearch;
      this.PageSize = pageSize;
      this.PageNumber = pageNumber;
      this.RecordCollectionId = recordCollectionId;
      this.ColumnOrderBy = columnOrderBy;
      this.TypeOrderBy = typeOrderBy;
      this.IsGetCache = isGetCache;
    }
  }