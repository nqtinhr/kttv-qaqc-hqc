export class FondModel {
    FondId: number;
    Name: string;
    Code: string;
    DepositSubjectId : number;
    Order?: number;
    Description : string;
    OrganizationId: number;
    CreatedByUserId?: number;
    CreatedOnDate?: Date;
    LastModifiedByUserId?: number;
    LastModifiedOnDate?: Date;
  }

  export class FondFilter {
    TextSearch: string;
    PageSize: number;
    PageNumber: number;
    OrganizationId: number;
    ColumnOrderBy?: string;
    TypeOrderBy?: string;
    IsGetCache?: boolean;
  }
  