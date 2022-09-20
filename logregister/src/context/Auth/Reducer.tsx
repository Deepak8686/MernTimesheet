import { SET_TOKEN } from "./Action";

export default (state: any, action: any) => {
    const { payload, type } = action;
    switch (type) {
        case SET_TOKEN:
            return {
                ...state,
                token: payload.token,
                isAuthrozied: payload.isAuthrozied
            };

        default:
            return state;
    }
};