import { createContext, useContext, useReducer } from "react";
import { IAuthProvider } from "../../Interface/IAuthInterface";
import { SET_TOKEN } from "./Action";
import Reducer from "./Reducer";

const initialProvider: IAuthProvider = {
    token: window.sessionStorage.getItem("token"),
    isAuthrozied: window.sessionStorage.getItem("token") ? true : false,
    setToken: (data: any) => { },
};

const AuthContext = createContext<IAuthProvider | undefined>(undefined);

const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(Reducer, initialProvider);

    const setToken = (data: any) => {
        dispatch({ type: SET_TOKEN, payload: data });
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthrozied: state.isAuthrozied,
                setToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("state must be used within provider");
    }
    return context;
};

export { AuthProvider, useAuthContext };
