import { DatePipe } from '@angular/common';
import { BaseFilter } from './BaseFilter';

export class LicenseFilter extends BaseFilter {
  constructor(
    pageNumber?: number,
    pageSize?: number,
    applicationId?: number,
    organizationId?: number,
    textSearch?: string,
    columnOrderBy?: string,
    typeOrderBy?: string,
    isGetCache?: boolean
  ) {
    super();
    this.TextSearch = textSearch;
    this.PageNumber = pageNumber;
    this.PageSize = pageSize;
    this.ColumnOrderBy = columnOrderBy;
    this.TypeOrderBy = typeOrderBy;
    this.ApplicationId = applicationId;
    this.OrganizationId = organizationId;
    this.IsGetCache = isGetCache;
  }
}
