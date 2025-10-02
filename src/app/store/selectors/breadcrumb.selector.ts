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
import { IbreadcrumbState } from '../states/breadcrumb.state';

const selectbreadcrumb = (state: IAppState) => state.breadcrumb;

export const selectedbreadcrumb = createSelector(
    selectbreadcrumb,
    (state: IbreadcrumbState) => state.breadcrumb
);
