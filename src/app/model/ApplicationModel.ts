export class ApplicationModel {
  ApplicationId: number;
  ApplicationName: string;
  ApplicationCode: string;
  Description?: string;
  AppUrl?: string;
  ConnectionString?: string;
  Status: number;
  Order?: number;
  ApplicationType?: number;
  AuthenType?: number;
  AppAdModel?: ApplicationAdModel;
  AppLdapModel?: ApplicationLdapModel;
  AppWso2Model?: ApplicationWso2Model;
  AppKeyCloakModel?: ApplicationKeyCloakModel;
}
export class ApplicationFilter {
  TextSearch: string;
  PageSize: number;
  PageNumber: number;
  ApplicationId?: number;
  ColumnOrderBy?: string;
  TypeOrderBy?: string;
  IsGetCache?: boolean;
  constructor(
    textSearch: string,
    pageSize: number,
    pageNumber: number,
    applicationId: number,
    columnOrderBy: string,
    typeOrderBy: string,
    IsGetCache: boolean
  ) {
    this.TextSearch = textSearch;
    this.PageSize = pageSize;
    this.PageNumber = pageNumber;
    this.ApplicationId = applicationId;
    this.ColumnOrderBy = columnOrderBy;
    this.TypeOrderBy = typeOrderBy;
    this.IsGetCache = IsGetCache;
  }
}
export class ApplicationAdModel {
  Id: number;
  ApplicationId: number;
  Path?: string;
  ServerAddress?: string;
  DomainName?: string;
  RootOu?: string;
  DefaultOu?: string;
  UserName?: string;
  DefaultUserName?: string;
  Password?: string;
  DefaultPassword?: string;
}
export class ApplicationLdapModel {
  Id: number;
  ApplicationId: number;
  Port?: string;
  Host?: string;
  Path?: string;
  RootPath?: string;
  Container?: string;
  UserManager?: string;
  Password?: string;
}
export class ApplicationWso2Model {
  Id: number;
  ApplicationId: number;
  Url?: string;
  BaseUrl?: string;
  ClientId?: string;
  ClientSecret?: string;
  RedirectUri?: string;
  UserName?: string;
  Password?: string;
  LoginUrl?: string;
  LogoutUrl?: string;
}
export class ApplicationKeyCloakModel {
  Id: number;
  ApplicationId: number;
  Url?: string;
  ClientId?: string;
  ClientSecret?: string;
  RedirectUri?: string;
  Audience?: string;
  AuthRealmUrl?: string;
  UserApiUrl?: string;
  Issuer?: string;
  Publickey?: string;
  LoginUrl?: string;
  LogoutUrl?: string;
}
