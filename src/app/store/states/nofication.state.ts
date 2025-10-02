/*******************************************************************************
 * Project：
 * Summary:
 *　　 User state
 * Remarks:
 *    Define state for User
 * History：
 *      ANBD            2021/07/20    Create
 ******************************************************************************/
import { INotification } from '~/app/model/notification.interface';
 export interface INotificationState {
    notification: INotification;
}

export const initialNotificationState: INotificationState = {
    notification: { type: 0 },
};
