export class SystemLogConfigModel {
    Id: number;
    Status: number;
}

export class SystemLogConfigFilter {
    TextSearch: string;
    PageSize: number;
    PageNumber: number;
    ApplicationId?: number;
    ColumnOrderBy?: string;
    TypeOrderBy?: string;

    constructor(textSearch: string, pageSize: number, pageNumber: number, columnOrderBy: string, typeOrderBy: string,
        applicationId?: number) {
        this.TextSearch = textSearch;
        this.PageSize = pageSize;
        this.PageNumber = pageNumber;
        this.ApplicationId = applicationId;
        this.ColumnOrderBy = columnOrderBy;
        this.TypeOrderBy = typeOrderBy;
    }
}