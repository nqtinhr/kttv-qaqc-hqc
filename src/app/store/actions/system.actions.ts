import { Action } from '@ngrx/store';
import { ISystem } from '~/app/model/system.interface';

export enum ESystemActions {
    GetSystem = '[User] Get system'
}

export class GetSystem implements Action {
    public readonly type = ESystemActions.GetSystem;
    constructor(public payload: ISystem) { }
}

export type systemActions = GetSystem;