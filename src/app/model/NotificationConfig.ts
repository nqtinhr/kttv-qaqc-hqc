export class NotificatinConfigModel {
    Id: number;
    WarehouseName: string;
    Noti_type: boolean;
    Parentid: number;
    UserId: number;
    UserName: string;
    Status: number;
    CreatedByUserId?: number;
    CreatedOnDate?: Date;
    LastModifiedByUserId?: number;
    LastModifiedOnDate?: Date;
  }

  export class NotificatinConfig {
    Id: number;
    UserName: string;

  }
  export class NotificatinConfigFilter {
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