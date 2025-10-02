import { ISystem } from '~/app/model/system.interface';
 export interface ISystemState {
    system: ISystem;
}

export const initialSystemState: ISystemState = {
    system: { type: 0 },
};