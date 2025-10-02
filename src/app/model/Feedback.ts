
export class FeedbackModel {
    Id: number;
    Name: string;
    Content: string;
    UserId: number;
    UserName: string;
    CreatedByUserId?: number;
    CreatedOnDate?: Date;
    LastModifiedByUserId?: number;
    LastModifiedOnDate?: Date;
    Status: number
  }

  export class FeedbackFilter {
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