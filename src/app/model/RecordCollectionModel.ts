export class RecordCollectionModel {
    RecordCollectionId: number;
    Title: string;
    Description : string;
    FondId: number;
    Status: number;
    CreatedByUserId?: number;
    CreatedOnDate?: Date;
    LastModifiedByUserId?: number;
    LastModifiedOnDate?: Date;
  }

  export class RecordCollectionFilter {
    TextSearch: string;
    PageSize: number;
    PageNumber: number;
    FondId: number;
    ColumnOrderBy?: string;
    TypeOrderBy?: string;
    IsGetCache?: boolean;
  }
  