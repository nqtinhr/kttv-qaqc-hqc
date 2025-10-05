import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Utility } from '~/app/utils/utility';
import { environment } from '~/environments/environment';
import { AppConfigs } from '~/app/app.config';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private router: Router,
    public ultil: Utility
  ) {}

  public get IsAuthenticated(): boolean {
    if (!environment.CheckAuthen) {
      return true;
    } else {
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
  }

  public DoPost(
    route: string = '',
    model: any = null,
    params: any = null
  ): Observable<any> {
    if (!this.IsAuthenticated) {
      this.doRedirectLogin();
      return new Observable<any>();
    }
    const token = window.localStorage.getItem(AppConfigs.AccessToken) ?? '';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };
    if (params != null) {
      route = route + (this.buildQueryStrings(params) ?? '');
    }
    const httpRequest =
      model != null
        ? this.http.post<any>(route, JSON.stringify(model), httpOptions)
        : this.http.post<any>(route, null, httpOptions);
    return httpRequest.pipe(
      map((res) => {
        if (
          res != null &&
          res.Error === true &&
          res.ID != null &&
          Number(res.ID) > 0
        ) {
          this.router.navigateByUrl('/login-error?id=' + res.ID);
        }
        return res;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  public DoPut(route = '', model = null, params = null): Observable<any> {
    if (!this.IsAuthenticated) {
      this.doRedirectLogin();
      return new Observable<any>();
    }
    const token = window.localStorage.getItem(AppConfigs.AccessToken) ?? '';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };
    if (params != null) {
      route = route + (this.buildQueryStrings(params) ?? '');
    }
    const httpRequest =
      model != null
        ? this.http.put<any>(route, JSON.stringify(model), httpOptions)
        : this.http.put<any>(route, null, httpOptions);
    return httpRequest.pipe(
      map((res) => {
        if (
          res != null &&
          res.Error === true &&
          res.ID != null &&
          Number(res.ID) > 0
        ) {
          this.router.navigateByUrl('/login-error?id=' + res.ID);
        }
        return res;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  public DoPostFile(
    route = '',
    fileToUpload: File,
    model: any
  ): Observable<any> {
    if (!this.IsAuthenticated) {
      this.doRedirectLogin();
      return new Observable<any>();
    }
    const token = window.localStorage.getItem(AppConfigs.AccessToken) ?? '';
    const formData: FormData = new FormData();
    formData.append('DestPath', model.destPath);
    formData.append('File', fileToUpload);
    // formData.append(fileToUpload.name, fileToUpload);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    };
    return this.http.post<any>(route, formData, httpOptions).pipe(
      map((res) => {
        if (
          res != null &&
          res.Error === true &&
          res.ID != null &&
          Number(res.ID) > 0
        ) {
          this.router.navigateByUrl('/login-error?id=' + res.ID);
        }
        return res;
      }),
      catchError((error) => this.handleError(error))
    );
  }
  public DoPostFileNoToken(
    route = '',
    param = '',
    fileToUpload: File
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append(param, fileToUpload);
    return this.http.post<any>(route, formData).pipe(
      map((res) => {
        return res;
      })
      // catchError((error) => this.handleError(error))
    );
  }
  public DoPostNoTokenjson(route = '', data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(route, JSON.stringify(data), httpOptions).pipe(
      map((res) => {
        return res;
      })
    );
  }
  public SigningDocumnetAPI(route = '', data: any): Observable<any> {
    if (!this.IsAuthenticated) {
      this.doRedirectLogin();
      return new Observable<any>();
    }
    const token = window.localStorage.getItem(AppConfigs.AccessToken) ?? '';
    const formData: FormData = new FormData();
    data.forEach((item) => {
      formData.append(item.key, item.value);
    });
    // formData.append(fileToUpload.name, fileToUpload);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    };
    return this.http.post<any>(route, formData, httpOptions).pipe(
      map((res) => {
        if (
          res != null &&
          res.Error === true &&
          res.ID != null &&
          Number(res.ID) > 0
        ) {
          this.router.navigateByUrl('/login-error?id=' + res.ID);
        }
        return res;
      }),
      catchError((error) => this.handleError(error))
    );
  }
  public SigningDocumnet(route = '', data: any): Observable<any> {
    const formData: FormData = new FormData();
    data.forEach((item) => {
      formData.append(item.key, item.value);
    });
    return this.http.post<any>(route, formData).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public DoPostFileMulti(route = '', fileToUpload: FileList): Observable<any> {
    if (!this.IsAuthenticated) {
      this.doRedirectLogin();
      return new Observable<any>();
    }
    const token = window.localStorage.getItem(AppConfigs.AccessToken) ?? '';
    const formData: FormData = new FormData();
    for (let i = 0; i < fileToUpload.length; i++) {
      formData.append(fileToUpload[i].name, fileToUpload[i]);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };
    return this.http.post<any>(route, formData, httpOptions).pipe(
      map((res) => {
        if (
          res != null &&
          res.Error === true &&
          res.ID != null &&
          Number(res.ID) > 0
        ) {
          this.router.navigateByUrl('/login-error?id=' + res.ID);
        }
        return res;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  public DoGet(route = '', params: any = null): Observable<any> {
    if (!this.IsAuthenticated) {
      this.doRedirectLogin();
      return new Observable<any>();
    }
    const token = window.localStorage.getItem(AppConfigs.AccessToken) ?? '';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };
    if (params != null) {
      route = route + this.buildQueryStrings(params);
    }
    return this.http.get<any>(route, httpOptions).pipe(
      map((res) => {
        if (
          res != null &&
          res.Error === true &&
          res.ID != null &&
          Number(res.ID) > 0
        ) {
          this.router.navigateByUrl('/login-error?id=' + res.ID);
        }
        return res;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  public DoGetAnonymous(route = '', params: any): Observable<any> {
    const operatingSystem = sessionStorage.getItem('operating-system') ?? '';
    const geolocation = sessionStorage.getItem('geo-location') ?? '';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'operating-system': operatingSystem,
        'geo-location': geolocation,
      }),
    };
    if (params != null) {
      route = route + this.buildQueryStrings(params);
    }
    return this.http.get<any>(route, httpOptions).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  public handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 401:
        this.router.navigateByUrl('/login-error?id=1');
        break;
      case 403:
        this.doRedirect403();
        break;
      case 404:
        //this.doRedirect404();
        break;
      case 405:
        this.doRedirect405();
        break;
      case 505:
        this.doRedirect505();
        break;
      default:
        this.router.navigate(['/login-error?id=1']);
        break;
    }
    // return an observable with a user-facing error message
    // console.error(error);
    return throwError('Something bad happened; please try again later.');
  }

  public doRedirectLogin(isLogout = false) {
    window.localStorage.removeItem(AppConfigs.AccessToken);
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: this.router.url },
    });
  }

  public doRedirect405() {
    this.router.navigate(['/405']).then((e) => {
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
    });
  }

  public doRedirect404() {
    this.router.navigate(['/404']).then((e) => {
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
    });
  }

  public doRedirect403() {
    this.router.navigate(['/403']).then((e) => {
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
    });
  }

  public doRedirect505() {
    this.router.navigate(['/505']).then((e) => {
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
    });
  }

  private buildQueryParams(source: any): HttpParams {
    let target: HttpParams = new HttpParams();
    Object.keys(source).forEach((key: string) => {
      const value: string | number | boolean | Date = source[key];
      if (typeof value !== 'undefined' && value !== null) {
        target = target.append(key, value.toString());
      }
    });
    return target;
  }

  private buildQueryStrings(source: any) {
    let target = '';
    let isFirst = true;
    Object.keys(source).forEach((key: string) => {
      const value: string | number | boolean | Date = source[key];
      if (typeof value !== 'undefined' && value !== null) {
        target += (isFirst ? '?' : '&') + key + '=' + value.toString();
      }
      isFirst = false;
    });
    console.log('target', target);
    return target;
  }

  public downloadFile(route, fileName: string) {
    const token = window.localStorage.getItem(AppConfigs.AccessToken) ?? '';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
        responseType: 'blob',
      }),
    };
    this.http.post<any>(route, null, httpOptions).subscribe((res) => {
      if (fileName.includes('verify')) {
        var filetxt = this.ultil.ConvertFileFromBase64(
          'text/plain',
          fileName,
          res.Data,
          true
        );
        this.ultil.DownloadFile(filetxt);
      } else {
        var sampleArr = this.base64ToArrayBuffer(res.Data);
        this.saveByteArray(fileName, sampleArr);
      }
    });
  }

  private base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  private saveByteArray(reportName, byte) {
    var blob = new Blob([byte], { type: 'application/zip' });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
  }
}
