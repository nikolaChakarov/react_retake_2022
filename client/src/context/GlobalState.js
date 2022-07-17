import { useReducer, createContext, useEffect } from "react";
import AppReducer from "./AppReducer";

const initState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    isLoading: false,
    errMessage: null,
};

export const GlobalContext = createContext(initState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initState);

    useEffect(() => {
        state.user
            ? localStorage.setItem("user", JSON.stringify(state.user))
            : localStorage.removeItem("user");
    }, [state.user]);

    return (
        <GlobalContext.Provider
            value={{
                user: state.user,
                isLoading: state.isLoading,
                errMessage: state.errMessage,
                dispatch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
