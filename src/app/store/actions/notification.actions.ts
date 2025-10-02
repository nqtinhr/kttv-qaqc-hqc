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
import { INotification } from '~/app/model/notification.interface';

export enum ENotificationActions {
    GetNotification = '[User] Get notification'
}

export class GetNotification implements Action {
    public readonly type = ENotificationActions.GetNotification;
    constructor(public payload: INotification) { }
}

export type notificationActions = GetNotification;
