export class ImportDocumentModel {
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

export class ImportDocumentFilter {
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

export class AddImportDocumentModel {
    filePath : string;
    ArchivetypeId: number;
}