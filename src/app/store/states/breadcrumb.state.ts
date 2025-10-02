/*******************************************************************************
 * Project：
 * Summary:
 *　　 User state
 * Remarks:
 *    Define state for User
 * History：
 *      ANBD            2021/07/20    Create
 ******************************************************************************/
 import { Ibreadcrumb } from '~/app/model/breadcrumb.interface';
 export interface IbreadcrumbState {
    breadcrumb: Ibreadcrumb;
}

export const initialbreadcrumbState: IbreadcrumbState = {
    breadcrumb: { 
        BreadcrumbC1: '',
        BreadcrumbC2:'' ,
        BreadcrumbC3: '',
    },
};

