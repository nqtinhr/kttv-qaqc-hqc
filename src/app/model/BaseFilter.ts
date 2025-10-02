export class BaseFilter {
  TextSearch?: string;
  PageSize?: number;
  PageNumber?: number;
  OrganizationId?: number;
  ApplicationId?: number;
  ApplicationName?: string;
  ColumnOrderBy?: string;
  TypeOrderBy?: string;
  IsGetCache?: boolean;
  IsReversed?: boolean | null;
  Type?: number;
  Status?: boolean | null;
  GroupRoleSearchId?: number | null;
  OrganizationSearchId?: number | null;
}
