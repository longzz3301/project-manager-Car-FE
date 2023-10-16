import { Action } from "global/interface";

const createReducer = (success: string, failed: string, clear?: string, update?: string) => {
    return (state: Record<string, unknown> | null = null, action: Action): Action | null => {
        switch (action.type) {
            case success:
                delete action.payload;
                return {
                    ...state,
                    ...action,
                }
            case failed:
                return {
                    ...state,
                    ...action,
                    success: false,
                    response: null
                }
            case update:
                return {
                    ...state,
                    ...action,
                    response: action.response,
                    success: true
                }
            case clear:
                return null;
            default:
                return state as Action
        }
    }
}
export default createReducer;