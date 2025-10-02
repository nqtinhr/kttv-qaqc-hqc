/*******************************************************************************
 * Project：
 * Summary:
 *　　 User Reducers
 * Remarks:
 *    Define Reducers for User
 * History：
 *      ANBD            2021/07/20    Create
 ******************************************************************************/

import { initialNotificationState, INotificationState } from '../states/nofication.state';
import { ENotificationActions, notificationActions } from '../actions/notification.actions';

export const notificationReducers = (
    state = initialNotificationState,
    action: notificationActions
): INotificationState => {
    switch (action.type) {
        case ENotificationActions.GetNotification: {
            return {
                ...state,
                notification: action.payload
            };
        }
        default:
            return state;
    }
};
