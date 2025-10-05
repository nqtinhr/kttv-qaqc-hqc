import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '~/environments/environment';
import { HttpService } from '../common/http.service';
import { Response } from '~/app/model/Response';
import { ApplicationModel } from '~/app/model/ApplicationModel';
import { CustomValidator } from '~/app/utils/helpers/custom-validator';
import { comboboxRouter } from '~/app/utils/consts/router';
@Injectable({
  providedIn: 'root',
})
export class ApplicationService extends CustomValidator {
  private URL_API_URL = environment.APP_API_URL;
  private controller: string = 'Application';

  private getEndPoint() {
    return `${this.URL_API_URL}/${this.controller}`;
  }

  constructor(private httpService: HttpService) {
    super(httpService);
  }
  public getData(params: object): Observable<Response<ApplicationModel[]>> {
    const API_RESQUEST = this.getEndPoint() + '/GetFilter';
    return this.httpService.DoPost(API_RESQUEST, params);
  }

  /**
   * thực hiện tạo mới bản ghi
   * @param params
   * @returns
   */
  public createObject(params: object): Observable<Response<boolean>> {
    const API_RESQUEST = this.getEndPoint() + '/Create';
    return this.httpService.DoPost(API_RESQUEST, params);
  }

  /**
   * thực hiện xóa nhiều bản ghi cùng lúc
   * @param params
   * @returns
   */
  public deleteRecords(params: object): Observable<Response<boolean>> {
    const API_RESQUEST = this.getEndPoint() + '/DeleteMany';
    return this.httpService.DoPost(API_RESQUEST, params);
  }

  /**
   * thực hiện xóa một bản ghi
   * @param params
   * @returns
   */
  public deleteRecord(params: number): Observable<Response<boolean>> {
    const API_RESQUEST = this.getEndPoint() + `/Delete?id=${params}`;
    return this.httpService.DoPost(API_RESQUEST);
  }

  /**
   * Thực hiện update bản ghi
   * @param params
   * @returns
   */
  public updateObject(
    id: number,
    params: object
  ): Observable<Response<boolean>> {
    const API_RESQUEST = this.getEndPoint() + `/Update?id=${id}`;
    return this.httpService.DoPost(API_RESQUEST, params);
  }

  /**
   * thực hiện tạo mới - cập nhật bản ghi
   * @param params
   * @returns
   */
  public createOrUpdateObject(params: object): Observable<Response<boolean>> {
    const API_RESQUEST = this.getEndPoint() + '/CreateOrUpdate';
    return this.httpService.DoPost(API_RESQUEST, params);
  }
  public getByApplicationType(
    applicationType: number
  ): Observable<Response<ApplicationModel[]>> {
    const API_RESQUEST =
      this.getEndPoint() +
      `/GetByApplicationType?applicationType=${applicationType}`;
    return this.httpService.DoGetAnonymous(API_RESQUEST, null);
  }

  public getListApplication(): Observable<any> {
    const API_RESQUEST =
      environment.APP_API_URL + comboboxRouter.getListApplication;
    return this.httpService.DoGet(API_RESQUEST, null);
  }
}
