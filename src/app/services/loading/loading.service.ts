/*******************************************************************************
 * Project：
 * Summary:
 *　　 LoadingService
 * Remarks:
 *    Define action for users
 * History：
 *      ANBD            2021/07/20    Create
 ******************************************************************************/
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetLoading } from 'src/app/store/actions/loading.actions';
import { IAppState } from 'src/app/store/states/app.state';

@Injectable({
  providedIn: 'root'
})

export class LoadingService {
  public isLoading = false;
  constructor(
    private store: Store<IAppState>,
  ) { }

  setDisplay(val: boolean) {
    this.isLoading = val;
    const obj = { value: val};
    this.store.dispatch(new GetLoading(obj));
  }
}
