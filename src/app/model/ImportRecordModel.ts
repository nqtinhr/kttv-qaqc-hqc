export class ImportRecordModel {
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

export class ImportRecordFilter {
    TextSearch: string;
    PageSize: number;
    PageNumber: number;
    RecordCollectionId: number;
    ColumnOrderBy?: string;
    TypeOrderBy?: string;

    constructor(
        textSearch: string, pageSize: number, pageNumber: number,
        columnOrderBy?: string, typeOrderBy?: string) {
    
        this.TextSearch = textSearch;
        this.PageSize = pageSize;
        this.PageNumber = pageNumber;
        this.ColumnOrderBy = columnOrderBy;
        this.TypeOrderBy = typeOrderBy;
    }
}

export class AddImportRecordModel {
    filePath : string;
    FondId : number;
    RecordColectionId: number;
    ArchivetypeId: number;
}