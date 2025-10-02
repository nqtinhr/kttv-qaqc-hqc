export class DepositSubjectModel {
    Id: number;
    ParentId:number;
    Name: string;
    Code: string;
    Address : string;
    PhoneNumber : string;
    Order?: number;
    Status : number;
    Description : string;
    CreatedByUserId?: number;
    CreatedOnDate?: Date;
    LastModifiedByUserId?: number;
    LastModifiedOnDate?: Date;
  }

  export class DepositSubjectFilter {
    TextSearch: string;
    PageSize: number;
    PageNumber: number;
    ColumnOrderBy?: string;
    TypeOrderBy?: string;
    IsGetCache?: boolean;
  }
  