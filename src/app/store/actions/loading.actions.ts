/*******************************************************************************
 * Project：
 * Summary:
 *　　 Action user
 * Remarks:
 *    Define action for users
 * History：
 *      ANBD            2021/07/20    Create
 ******************************************************************************/

import { Action } from '@ngrx/store';
import { ILoading } from '~/app/model/loading.interface';

export enum ELoadingActions {
    GetLoading = '[User] Get GetLoading'
}

export class GetLoading implements Action {
    public readonly type = ELoadingActions.GetLoading;
    constructor(public payload: ILoading) { }
}

export type LoadingActions = GetLoading;
