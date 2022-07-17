import { useRef, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../../context/GlobalState";

import CircularProgress from "@mui/material/CircularProgress";
import { Close } from "@mui/icons-material";

const Login = () => {
    const { user, dispatch, isLoading, errMessage } = useContext(GlobalContext);

    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({
            type: "LOADING",
        });

        const emailEl = emailRef.current;
        const passwordEl = passwordRef.current;

        const userInfo = { email: emailEl.value, password: passwordEl.value };

        const dbResponse = await (
            await fetch("http://localhost:5005/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(userInfo),
            })
        ).json(); // { success: bool, user: object }

        setTimeout(() => {
            dispatch({
                type: "END_LOADING",
            });
        }, 1000);

        if (!dbResponse.success) {
            dispatch({
                type: "SET_ERROR",
                payload: dbResponse.message,
            });

            return;
        }

        dispatch({
            type: "AUTH_USER",
            payload: dbResponse.user,
        });
    };

    const handleCancel = () => {
        dispatch({
            type: "CLEAR_ERROR",
        });
        navigate("/home");
    };

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    return (
        <LoginContainer className="login-container">
            <div className="login-wrapper">
                <h3>Please, login!</h3>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        <span>Email</span>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            ref={emailRef}
                            // required
                        />
                    </label>

                    <label htmlFor="password">
                        <span>Password</span>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            ref={passwordRef}
                            // required
                        />
                    </label>

                    <div className="bttns-container">
                        <button className="bttn bttn-login" type="submit">
                            Login
                        </button>
                        <button
                            className="bttn bttn-cancel"
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>

                        {isLoading && (
                            <CircularProgress
                                size={"20px"}
                                sx={{
                                    color: "#f25c05",
                                }}
                            />
                        )}
                    </div>
                </form>

                <div className="no-have-account">
                    <span>
                        Don't have an account? Please,{" "}
                        <Link to={"/register"}>Register here.</Link>
                    </span>
                </div>

                {errMessage && (
                    <div className="error-el">
                        <span>{errMessage}</span>
                        <Close
                            className="icon-close"
                            onClick={() => dispatch({ type: "CLEAR_ERROR" })}
                        />
                    </div>
                )}
            </div>
        </LoginContainer>
    );
};

const LoginContainer = styled.div`
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--gray);

    .login-wrapper {
        background: #fff;
        padding: 20px;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        box-shadow: var(--shadow);
        width: 300px;
    }

    h3 {
        text-align: center;
        color: var(--gray);
    }

    .login-form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    label {
        display: flex;
        flex-direction: column;
        font-weight: 600;
        font-size: 14px;
        gap: 5px;

        input {
            padding: 5px;
            border: 1px solid var(--orange);
            border-radius: 5px;
            color: var(--gray);
        }
    }
    .bttns-container {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;

        .bttn {
            padding: 10px 15px;
            color: #fff;
            border: none;
            border-radius: 10px 15px;
        }

        .bttn-login {
            background: var(--orange);
        }

        .bttn-cancel {
            background: var(--gray);
        }
    }

    .error-el {
        background: var(--gray);
        padding: 5px;
        border-radius: 5px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-top: 10px;

        .icon-close {
            position: absolute;
            right: 5px;
            cursor: pointer;
        }
    }

    .no-have-account {
        font-size: 12px;
        padding-top: 5px;
        border-top: 1px groove #fff;
        text-align: center;
        a {
            font-weight: 600;
            color: var(--gray);
        }
    }
`;

export default Login;
