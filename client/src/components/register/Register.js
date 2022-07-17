import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../../context/GlobalState";

import CircularProgress from "@mui/material/CircularProgress";
import { Close } from "@mui/icons-material";

const Register = () => {
    const { user, dispatch, isLoading, errMessage } = useContext(GlobalContext);

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
        password2: "",
        email: "",
    });

    const onInputChange = (e) => {
        setUserInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({
            type: "LOADING",
        });

        console.log(userInfo);

        const dbResponse = await (
            await fetch("http://localhost:5005/api/users/register", {
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
        <RegisterContainer className="register-container">
            <div className="register-wrapper">
                <h3>Please, register!</h3>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        <span>Username</span>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={userInfo.username}
                            onChange={onInputChange}
                            required
                        />
                    </label>

                    <label htmlFor="email">
                        <span>Email</span>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={userInfo.email}
                            onChange={onInputChange}
                            required
                        />
                    </label>

                    <label htmlFor="password">
                        <span>Password</span>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            value={userInfo.password}
                            onChange={onInputChange}
                            required
                        />
                    </label>

                    <label htmlFor="password2">
                        <span>Repeat password</span>
                        <input
                            type="text"
                            id="password2"
                            name="password2"
                            value={userInfo.password2}
                            onChange={onInputChange}
                        />
                    </label>

                    <div className="bttns-container">
                        <button className="bttn bttn-register" type="submit">
                            Register
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

                <div className="have-account">
                    <span>
                        Already have an account? Please,{" "}
                        <Link to={"/login"}>Login here.</Link>
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
        </RegisterContainer>
    );
};

const RegisterContainer = styled.div`
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

    .register-wrapper {
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

    .register-form {
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

        .bttn-register {
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

    .have-account {
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

export default Register;
