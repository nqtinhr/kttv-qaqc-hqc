import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from './http.service';
import { AppConfigs } from '~/app/app.config';
import { map, catchError } from 'rxjs/operators';
import { environment } from '~/environments/environment';
import { JwtHelper } from '~/app/utils/helpers/jwl.helper';
import { Const, NotifierType } from '~/app/utils/consts/const';
import { authenRouter } from '~/app/utils/consts/router';
import jwt_decode from 'jwt-decode';
import { Utility } from '~/app/utils/utility';

@Injectable({
  providedIn: 'root',
})
export class AuthenService {
  @Input() loading = false;
  isLogin = false;
  Application: any;
  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    public util: Utility,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public static get IsAuthenticated(): boolean {
    const token = window.localStorage.getItem(AppConfigs.AccessToken);
    if (token && token.length > 0) {
      let tokenExpried = window.localStorage.getItem(AppConfigs.TokenExpried);
      if (tokenExpried && tokenExpried.length > 0) {
        if (Number(tokenExpried) < new Date().getTime()) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
    return false;
  }

  public static get AuthenType(): string {
    const authenType = window.localStorage.getItem('authenType');
    if (authenType) {
      return authenType.toLowerCase();
    } else {
      return '';
    }
  }

  public static get KeyCloakAuthenType(): boolean {
    return this.AuthenType === 'keycloak';
  }

  public static get Wso2AuthenType(): boolean {
    return this.AuthenType === 'wso2';
  }

  public static getRoles() {
    const token = window.localStorage.getItem(AppConfigs.InfoToken);
    if (token && token.length > 0) {
      const decode = JwtHelper.decodeToken(token);
      if (decode && decode.Role && decode.Role.length > 0) {
        return decode.Role;
      }
    }
    return '';
  }

  public static getGroups() {
    const token = window.localStorage.getItem(AppConfigs.InfoToken);
    if (token && token.length > 0) {
      const decode = JwtHelper.decodeToken(token);
      if (decode && decode.Groups_Role && decode.Groups_Role.length > 0) {
        return decode.Groups_Role;
      }
    }
    return '';
  }

  public static getUserName() {
    let token, decode;
    token = window.localStorage.getItem(AppConfigs.InfoToken);
    if (token && token.length > 0) {
      decode = JwtHelper.decodeToken(token);
      if (decode && decode.UserName && decode.UserName.length > 0)
        return decode.UserName;
      else if (decode.UserName && decode.UserName.length > 0)
        return decode.UserName;
    }
    return '';
  }

  public static getDisplayName() {
    let token, decode;
    token = window.localStorage.getItem(AppConfigs.InfoToken);
    if (token && token.length > 0) {
      decode = JwtHelper.decodeToken(token);
      if (decode && decode.FullName && decode.FullName.length > 0)
        return decode.FullName;
      else if (decode.FullName && decode.FullName.length > 0)
        return decode.FullName;
    }
    return '';
  }

  public static getUserId() {
    let token, decode;
    token = window.localStorage.getItem(AppConfigs.InfoToken);
    if (token && token.length > 0) {
      decode = JwtHelper.decodeToken(token);
      if (decode && decode.UserId && decode.UserId > 0) return decode.UserId;
    }
    return null;
  }

  public static getApplicationId() {
    let token, decode;
    token = window.localStorage.getItem(AppConfigs.InfoToken);
    if (token && token.length > 0) {
      decode = JwtHelper.decodeToken(token);
      if (decode && decode.ApplicationId && decode.ApplicationId > 0)
        return decode.ApplicationId;
    }
    return null;
  }

  public static getApplicationType() {
    let token, decode;
    token = window.localStorage.getItem(AppConfigs.InfoToken);
    if (token && token.length > 0) {
      decode = JwtHelper.decodeToken(token);
      if (decode && decode.ApplicationType && decode.ApplicationType > 0)
        return decode.ApplicationType;
    }
    return null;
  }

  public static getAuthenType() {
    let token, decode;
    token = window.localStorage.getItem(AppConfigs.InfoToken);
    if (token && token.length > 0) {
      decode = JwtHelper.decodeToken(token);
      if (decode && decode.AuthenType && decode.AuthenType > 0)
        return decode.AuthenType;
    }
    return null;
  }

  public static getIsAdmin() {
    let token, decode;
    token = window.localStorage.getItem(AppConfigs.InfoToken);
    if (token && token.length > 0) {
      decode = JwtHelper.decodeToken(token);
      if (decode && decode.IsAdmin) return decode.IsAdmin;
    }
    return null;
  }

  public doLogin(code: string) {
    this.loading = !this.loading;
    let apiUrl =
      environment.APP_API_URL +
      authenRouter.login +
      `?applicationId=${localStorage.getItem(
        'applicationId'
      )}&authenType=${localStorage.getItem('authenType')}&isSystem=${
        environment.IsSystem
      }&code=${code}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const httpRequest = this.http.post<any>(apiUrl, null, httpOptions);
    return httpRequest.pipe(
      map((msg) => {
        this.loading = !this.loading;
        if (msg && msg.Error === false) {
          //this.notifier.notify(NotifierType.Success, "Đăng nhập thành công");
          window.localStorage.setItem(AppConfigs.AccessToken, msg.AccessToken);
          window.localStorage.setItem(
            AppConfigs.RefreshToken,
            msg.RefreshToken
          );
          window.localStorage.setItem(AppConfigs.IdToken, msg.IdToken);
          window.localStorage.setItem(AppConfigs.InfoToken, msg.Data);
          const decode = JSON.parse(atob(msg.Data));
          window.localStorage.setItem(AppConfigs.UserID, decode.UserId);
          var expiredDate = new Date(
            new Date().getTime() + Const.TokenExpriedMinute * 60000
          );
          window.localStorage.setItem(
            AppConfigs.TokenExpried,
            expiredDate.getTime().toString()
          );
          setTimeout(() => {
            let returnUrl =
              this.activatedRoute.snapshot.queryParams['returnUrl'];
            if (returnUrl === undefined) {
              returnUrl = '/dashboard';
            }
            this.router.navigateByUrl(returnUrl);
          }, 1000);
        } else {
          this.router.navigateByUrl('/login-error?id=' + msg.ID);
        }
        return msg;
      }),
      catchError((err) => {
        return this.httpService.handleError(err);
      })
    );
  }

  public doLoginJWT(model: any) {
    this.loading = !this.loading;
    let apiUrl = environment.APP_API_URL + authenRouter.loginJWT;
    const operatingSystem = sessionStorage.getItem('operating-system') ?? '';
    const geolocation = sessionStorage.getItem('geo-location') ?? '';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'operating-system': operatingSystem,
        'geo-location': geolocation,
      }),
    };

    const httpRequest = this.http.post<any>(apiUrl, model, httpOptions);
    return httpRequest.pipe(
      map((msg) => {
        this.loading = !this.loading;
        if (msg != null) {
          if (!msg.Error) {
            const decode = jwt_decode(msg.AccessToken) as any;
            window.localStorage.setItem(
              AppConfigs.AccessToken,
              msg.AccessToken
            );
            window.localStorage.setItem(
              AppConfigs.TokenExpried,
              (decode?.exp * 1000).toString()
            );
            window.localStorage.setItem(AppConfigs.InfoToken, msg.Data);
            this.router.navigateByUrl('/');
          }
        } else {
          this.router.navigateByUrl('/login-error?id=' + msg.ID);
        }
        return msg;
      }),
      catchError((err) => {
        return this.httpService.handleError(err);
      })
    );
  }

  public doLogout() {
    this.loading = !this.loading;
    let apiUrl = environment.APP_API_URL + authenRouter.logOut;
    var id_token = window.localStorage.getItem(AppConfigs.IdToken) ?? '';
    var access_token =
      window.localStorage.getItem(AppConfigs.AccessToken) ?? '';
    const operatingSystem = sessionStorage.getItem('operating-system') ?? '';
    const geolocation = sessionStorage.getItem('geo-location') ?? '';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'operating-system': operatingSystem,
        'geo-location': geolocation,
        Authorization: access_token,
      }),
    };

    if (AuthenService.KeyCloakAuthenType) {
      this.http.post<any>(apiUrl, null, httpOptions).subscribe((res) => {
        if (res && res?.Data) {
          let logouturl;
          window.localStorage.removeItem('navigation');
          //window.localStorage.removeItem('language');
          window.localStorage.removeItem(
            'InitedSideBar-' + AuthenService.getUserId()
          );
          window.localStorage.removeItem(AppConfigs.AccessToken);
          window.localStorage.removeItem(AppConfigs.RefreshToken);
          window.localStorage.removeItem(AppConfigs.IdToken);
          window.localStorage.removeItem(AppConfigs.InfoToken);
          window.localStorage.removeItem(AppConfigs.TokenExpried);

          if (!this.util.isNullOrEmpty(localStorage.getItem('application'))) {
            this.Application = JSON.parse(
              localStorage.getItem('application') ?? ''
            );
            if (this.Application.AppKeyCloakModel === null) {
              logouturl = '/authenticate';
            } else {
              logouturl = this.Application.AppKeyCloakModel.LogoutUrl.replace(
                '{0}',
                id_token
              ).replace('{1}', this.Application.AppKeyCloakModel.RedirectUri);
            }
          } else {
            this.router.navigateByUrl('/authenticate');
          }
          window.localStorage.removeItem('application');
          // window.localStorage.removeItem('applicationId');
          window.localStorage.removeItem('authenType');
          this.router.navigateByUrl(logouturl);
        }
      });
    } else if (AuthenService.Wso2AuthenType) {
      this.http.post<any>(apiUrl, null, httpOptions).subscribe((res) => {
        if (res && res?.Data) {
          let logouturl;
          window.localStorage.removeItem('navigation');
          //window.localStorage.removeItem('language');
          window.localStorage.removeItem(
            'InitedSideBar-' + AuthenService.getUserId()
          );
          window.localStorage.removeItem(AppConfigs.AccessToken);
          window.localStorage.removeItem(AppConfigs.RefreshToken);
          window.localStorage.removeItem(AppConfigs.IdToken);
          window.localStorage.removeItem(AppConfigs.InfoToken);
          window.localStorage.removeItem(AppConfigs.TokenExpried);
          if (!this.util.isNullOrEmpty(localStorage.getItem('application'))) {
            this.Application = JSON.parse(
              localStorage.getItem('application') ?? ''
            );
            if (this.Application.AppWso2Model === null) {
              logouturl = '/authenticate';
            } else {
              logouturl = this.Application.AppWso2Model.LogoutUrl.replace(
                '{0}',
                id_token
              ).replace('{1}', this.Application.AppWso2Model.RedirectUri);
            }
          } else {
            logouturl = '/authenticate';
          }
          window.localStorage.removeItem('application');
          // window.localStorage.removeItem('applicationId');
          window.localStorage.removeItem('authenType');
          this.router.navigateByUrl(logouturl);
        }
      });
    } else {
      this.http.post<any>(apiUrl, null, httpOptions).subscribe((res) => {
        if (res && res?.Data) {
          window.localStorage.removeItem('navigation');
          //window.localStorage.removeItem('language');
          window.localStorage.removeItem(
            'InitedSideBar-' + AuthenService.getUserId()
          );
          window.localStorage.removeItem(AppConfigs.AccessToken);
          window.localStorage.removeItem(AppConfigs.RefreshToken);
          window.localStorage.removeItem(AppConfigs.IdToken);
          window.localStorage.removeItem(AppConfigs.InfoToken);
          window.localStorage.removeItem(AppConfigs.TokenExpried);
          window.localStorage.removeItem('application');
          // window.localStorage.removeItem('applicationId');
          window.localStorage.removeItem('authenType');
          this.router.navigateByUrl('/authenticate');
        }
      });
    }
  }
}
