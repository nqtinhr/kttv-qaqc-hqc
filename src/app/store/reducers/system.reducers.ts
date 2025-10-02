
import { initialSystemState, ISystemState } from '../states/system.state';
import { ESystemActions, systemActions } from '../actions/system.actions';

export const systemReducers = (
    state = initialSystemState,
    action: systemActions
): ISystemState => {
    switch (action.type) {
        case ESystemActions.GetSystem: {
            return {
                ...state,
                system: action.payload
            };
        }
        default:
            return state;
    }
};