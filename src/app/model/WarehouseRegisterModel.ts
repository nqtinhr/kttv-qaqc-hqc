
export class WarehouseRegisterModel {
    Id: number;
    RegisterDate: Date;
    EntryTime: Date;
    TimeOut: Date;
    FullName: string;
    Phone: string;
    Email: string;
    Description: string;
    Reason: string;
    Persontype: number;
    WarehouseId: number;
    WarehouseName: string;
    UserId: number;
    UserName: string;
    CreatedByUserId?: number;
    CreatedOnDate?: Date;
    LastModifiedByUserId?: number;
    LastModifiedOnDate?: Date;
  }

  export class WarehouseRegisterFilter {
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