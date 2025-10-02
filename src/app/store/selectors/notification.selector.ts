/*******************************************************************************
 * Project：
 * Summary:
 *　　 User selector
 * Remarks:
 *    Define selector for User
 * History：
 *    ANBD            2021/07/28    Create
 ******************************************************************************/

import { createSelector } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { INotificationState } from '../states/nofication.state';

const selectNotification = (state: IAppState) => state.notification;

export const selectedNotification = createSelector(
    selectNotification,
    (state: INotificationState) => state.notification.type
);
