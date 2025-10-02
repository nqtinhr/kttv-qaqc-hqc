/*******************************************************************************
 * Project：
 * Summary:
 *　　 User Reducers
 * Remarks:
 *    Define Reducers for User
 * History：
 *      ANBD            2021/07/20    Create
 ******************************************************************************/

import { ELoadingActions, LoadingActions } from './../actions/loading.actions';
import { initialLoadingState, ILoadingState } from '../states/loading.state';

export const loadingReducers = (
    state = initialLoadingState,
    action: LoadingActions
): ILoadingState => {
    switch (action.type) {
        case ELoadingActions.GetLoading: {
            return {
                ...state,
                loading: action.payload
            };
        }
        default:
            return state;
    }
};
