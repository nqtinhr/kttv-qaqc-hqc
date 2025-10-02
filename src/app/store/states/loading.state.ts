/*******************************************************************************
 * Project：
 * Summary:
 *　　 User state
 * Remarks:
 *    Define state for User
 * History：
 *      ANBD            2021/07/20    Create
 ******************************************************************************/
 import { ILoading } from '~/app/model/loading.interface';
 export interface ILoadingState {
    loading: ILoading;
}

export const initialLoadingState: ILoadingState = {
    loading: { value: false },
};
