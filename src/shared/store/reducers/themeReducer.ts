import { ThemeActionType } from '../actions/themeActions';

const initialValue = 'default';

const themeReducer = (state: string = initialValue, action: ThemeActionType): string => {
    if (action && action.payload) {
        return action.payload;
    }
    return state;
};

export default themeReducer;