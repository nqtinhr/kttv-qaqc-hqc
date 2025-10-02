/*******************************************************************************
 * Project：
 * Summary:
 *　　 BreadCumbService
 * Remarks:
 *    Define action for users
 * History：
 *      ANBD            2021/07/20    Create
 ******************************************************************************/
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Getbreadcrumb } from 'src/app/store/actions/breadcrumb.actions';
import { IAppState } from 'src/app/store/states/app.state';

@Injectable({
  providedIn: 'root'
})

export class BreadCumbService {
  constructor(
    private store: Store<IAppState>,
  ) { }

  setBreadCumb(navc1: string, navc2: string, navc3: string = '') {
    const obj = { BreadcrumbC1: navc1, BreadcrumbC2:navc2,BreadcrumbC3:navc3};
    this.store.dispatch(new Getbreadcrumb(obj));
  }
}
