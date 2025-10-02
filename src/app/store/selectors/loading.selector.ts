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
import { ILoadingState } from '../states/loading.state';

const selectLoading = (state: IAppState) => state.loading;

export const selectedLoading = createSelector(
    selectLoading,
    (state: ILoadingState) => state.loading.value
);
