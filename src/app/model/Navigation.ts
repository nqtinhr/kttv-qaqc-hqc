export class Navigation {
    NavigationId: number;
    NavigationCode: string;
    NavigationName: string;
    NavigationNameEN: string;
    ParentNavigationId?: number;
    ParentNavigationName?: string;
    ParentNavigationNameEN?: string;
    CreatedByUserId?: number;
    CreatedOnDate?: Date;
    LastModifiedByUserId?: number;
    LastModifiedOnDate?: Date;
    ApplicationId: number;
    Status?: number;
    Order?: number;
    disabled: boolean;
    level3: boolean;

    constructor() {

    }
}

export class NavigationFilter {
    TextSearch: string;
    PageSize: number;
    PageNumber: number;
    ApplicationId?: string;
    ColumnOrderBy?: string;
    TypeOrderBy?: string;
    constructor(textSearch: string, pageSize: number, pageNumber: number, applicationId: string, columnOrderBy: string, typeOrderBy: string) {
        this.TextSearch = textSearch;
        this.PageSize = pageSize;
        this.PageNumber = pageNumber;
        this.ApplicationId = applicationId;
        this.ColumnOrderBy = columnOrderBy;
        this.TypeOrderBy = typeOrderBy;
    }
}