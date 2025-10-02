/*******************************************************************************
 * Project：
 * Summary:
 *　　 App Reducers
 * Remarks:
 *    Define Reducers for app
 * History：
 *    ANBD            2022/07/20    Create
 ******************************************************************************/

import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { loadingReducers } from './loading.reducers';
import { breadcrumbReducers } from './breadcrumb.reducers';
import { notificationReducers } from './notification.reducers';
import { systemReducers } from './system.reducers';



export const appReducers: ActionReducerMap<IAppState, any> = {
  loading: loadingReducers,
  breadcrumb:breadcrumbReducers,
  notification:notificationReducers,
  system:systemReducers
};
