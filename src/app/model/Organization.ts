import { BaseFilter } from "./BaseFilter";

export class Organization {
  OrganizationId: number;
  OrganizationCode: string;
  OrganizationName: string;
  ParentOrganizationId?: number;
  ParentOrganizationName?: string;
  Mobile?: string;
  Fax?: string;
  Type?: number;
  Level?: number;
  Address?: string;
  Description?: string;
  CountryId?: number;
  LocationId?: number;
  DistrictId?: number;
  WardId?: number;
  Website?: string;
  CallBackUrl?: string;
  CreatedByUserId?: number;
  CreatedOnDate?: Date;
  LastModifiedByUserId?: number;
  LastModifiedOnDate?: Date;
  ApplicationId: number;
  Status?: number;
  Order?: number;
}

export class OrganizationFilter extends BaseFilter {
  constructor(
    textSearch: string,
    pageSize: number,
    pageNumber: number,
    applicationId: number,
    columnOrderBy: string,
    typeOrderBy: string,
    isGetCache?: boolean
  ) {
    super();
    this.TextSearch = textSearch;
    this.PageSize = pageSize;
    this.PageNumber = pageNumber;
    this.ApplicationId = applicationId;
    this.ColumnOrderBy = columnOrderBy;
    this.TypeOrderBy = typeOrderBy;
    this.IsGetCache = isGetCache;
  }
}
