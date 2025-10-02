/*******************************************************************************
 * Project：
 * Summary:
 *　　 app state
 * Remarks:
 *    Define state for app
 * History：
 *      ANBD            2021/07/20    Create
 ******************************************************************************/
import { ILoadingState, initialLoadingState } from './loading.state';
import { IbreadcrumbState, initialbreadcrumbState } from './breadcrumb.state';
import { INotificationState,initialNotificationState } from './nofication.state';
import { ISystemState,initialSystemState } from './system.state';

export interface IAppState {
    loading: ILoadingState;
    breadcrumb: IbreadcrumbState;
    notification: INotificationState;
    system: ISystemState;
}

export const initialAppState: IAppState = {
    loading: initialLoadingState,
    breadcrumb: initialbreadcrumbState,
    notification: initialNotificationState,
    system: initialSystemState,
};

export function getInitialState(): IAppState {
    return initialAppState;
}
