import { createSelector } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { ISystemState } from '../states/system.state';

const selectedSystem = (state: IAppState) => state.system;

export const selectedSystems = createSelector(
    selectedSystem,
    (state: ISystemState) => state.system.type
);