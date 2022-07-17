const AppReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                isLoading: true,
            };

        case "END_LOADING":
            return {
                ...state,
                isLoading: false,
            };
        case "SET_ERROR":
            return {
                ...state,
                errMessage: action.payload,
            };
        case "CLEAR_ERROR":
            return {
                ...state,
                errMessage: null,
            };
        case "AUTH_USER":
            return {
                ...state,
                isLoading: false,
                errMessage: null,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
            };

        default:
            return state;
    }
};

export default AppReducer;
