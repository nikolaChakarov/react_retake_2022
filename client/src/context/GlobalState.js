import { useReducer, createContext } from "react";
import AppReducer from "./AppReducer";

const initState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    isLoading: false,
    error: false,
};

export const GlobalContext = createContext(initState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initState);

    return (
        <GlobalContext.Provider
            value={{
                user: state.user,
                isLoading: state.isLoading,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
