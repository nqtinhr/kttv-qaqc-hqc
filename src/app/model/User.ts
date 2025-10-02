import { DatePipe } from "@angular/common";
import { BaseFilter } from "./BaseFilter";

export class UserFilter extends BaseFilter {
  constructor(
    pageNumber?: number,
    pageSize?: number,
    applicationId?: number,
    organizationId?: number,
    textSearch?: string,
    columnOrderBy?: string,
    typeOrderBy?: string,
    isGetCache?: boolean,
    isReversed?: boolean,
    type?: number,
    status?: boolean,
    groupRoleSearchId?: number,
    organizationSearchId?: number
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
    this.IsReversed = isReversed;
    this.Type = type;
    this.Status = status;
    this.GroupRoleSearchId = groupRoleSearchId;
    this.OrganizationSearchId = organizationSearchId
  }
}
export class UserModel {
  UserId: number;
  UserName: string;
  ApplicationId: number;
  FullName : string;
  Status?: boolean;

}
