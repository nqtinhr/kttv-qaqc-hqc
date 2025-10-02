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
import { Ibreadcrumb } from '~/app/model/breadcrumb.interface';

export enum EbreadcrumbActions {
    Getbreadcrumb = '[User] Get breadcrumb'
}

export class Getbreadcrumb implements Action {
    public readonly type = EbreadcrumbActions.Getbreadcrumb;
    constructor(public payload: Ibreadcrumb) { }
}

export type breadcrumbActions = Getbreadcrumb;
