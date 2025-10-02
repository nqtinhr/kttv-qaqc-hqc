export class SystemLog {
    LogId: number;
    Date: Date;
    ActionByUser: string;
    UserId: number;
    ApplicationId: number;
    Content?: string;
    ContentEN?: string;
    IpAddress?: string;
    AppCodeName?: string;
    AppName?: string;
    AppVersion?: string;
    UserAgent?: string;
    Language?: string;
    DeviceMemory?: string;
    Platform?: string;
    Vendor?: string;
    VendorSub?: string;
    Product?: string;
    ProductSub?: string;
    CookieEnabled?: boolean;
    Latitude?: string;
    Longitude?: string;
    ResponseCode?: string;
    UserName?: string;
    FullName?: string;
    ApplicationName?: string;
    ApplicationCode?: string;
    isChecked?: boolean;
    constructor() {

    }
}

export class SystemLogFilter {
    TextSearch: string;
    PageSize: number;
    PageNumber: number;
    ApplicationId?: number;
    ColumnOrderBy?: string;
    TypeOrderBy?: string;
    FromDate?: Date;
    ToDate?: Date;
    Action?: string;
    IsReversed?: boolean | null;

    constructor(textSearch: string, pageSize: number, pageNumber: number, columnOrderBy: string, typeOrderBy: string,
        applicationId?: number, fromDate?: Date, toDate?: Date, action?: string, isReversed?: boolean) {
        this.TextSearch = textSearch;
        this.PageSize = pageSize;
        this.PageNumber = pageNumber;
        this.ApplicationId = applicationId;
        this.ColumnOrderBy = columnOrderBy;
        this.TypeOrderBy = typeOrderBy;
        this.FromDate = fromDate;
        this.ToDate = toDate;
        this.Action = action;
        this.IsReversed = isReversed;
    }
}