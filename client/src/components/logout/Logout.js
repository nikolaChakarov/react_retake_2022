import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

const Logout = () => {
    const { dispatch, user } = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }

        dispatch({
            type: "LOGOUT",
        });
    }, [dispatch, user, navigate]);

    return null;
};

export default Logout;
