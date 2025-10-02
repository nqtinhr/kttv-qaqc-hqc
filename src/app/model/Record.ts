export class RecordModel {
    RecordId : number;
    OrganizationId : number;
    OrganizationName : string;
    RecordCollectionId: number;
    FondId : number;
    ArchiveName : string;
    Name : string;
    Code : string;
    Description : string;
    Status : number;
    CreatedByUserId?: number;
    CreatedOnDate?: Date;
    LastModifiedByUserId?: number;
    LastModifiedOnDate?: Date;
  }

  export class RecordMetadata {
    Id : number;
    RecordId : number;
    ArchiveTypeId :number;
    FieldId : number;
    FieldCode : string;
    Value : string;
    NameField : string;
  }

  export class RecordFilter {
    TextSearch: string;
    PageSize: number;
    PageNumber: number;
    RecordCollectionId: number;
    ColumnOrderBy?: string;
    TypeOrderBy?: string;
    IsGetCache?: boolean;
  }
