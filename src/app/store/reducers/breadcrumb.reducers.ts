/*******************************************************************************
 * Project：
 * Summary:
 *　　 User Reducers
 * Remarks:
 *    Define Reducers for User
 * History：
 *      ANBD            2021/07/20    Create
 ******************************************************************************/

import { EbreadcrumbActions, breadcrumbActions } from '../actions/breadcrumb.actions';
import { IbreadcrumbState, initialbreadcrumbState } from '../states/breadcrumb.state';

export const breadcrumbReducers = (
    state = initialbreadcrumbState,
    action: breadcrumbActions
): IbreadcrumbState => {
    switch (action.type) {
        case EbreadcrumbActions.Getbreadcrumb: {
            return {
                ...state,
                breadcrumb: action.payload
            };
        }
        default:
            return state;
    }
};
