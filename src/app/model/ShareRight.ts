export class ShareRightModel {
    Id: number;
    Name: string;
    Code: string;
    Type: number;
    Status : number;
    CreatedByUserId?: number;
    CreatedOnDate?: Date;
    LastModifiedByUserId?: number;
    LastModifiedOnDate?: Date;
  }

  export class ShareRightFilter {
    TextSearch: string;
    PageSize: number;
    PageNumber: number;
    ColumnOrderBy?: string;
    TypeOrderBy?: string;
    IsGetCache?: boolean;
  }