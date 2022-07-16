import { useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../../context/GlobalState";

const Login = () => {
    const { user, dispatch, isLoading, error } = useContext(GlobalContext);

    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailEl = emailRef.current;
        const passwordEl = passwordRef.current;

        const userInfo = { email: emailEl.value, password: passwordEl.value };

        const dbResponse = await (
            await fetch("http://localhost:5005/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo),
            })
        ).json();

        console.log(dbResponse);
    };

    const handleCancel = () => {
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
                            required
                        />
                    </label>

                    <label htmlFor="password">
                        <span>Password</span>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            ref={passwordRef}
                            required
                        />
                    </label>

                    <div className="bttns-container">
                        <button type="submit">Login</button>
                        <button type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
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

    .login-wrapper {
        background: #fff;
        padding: 20px;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        box-shadow: var(--shadow);
        width: 300px;
    }

    .login-form {
        display: flex;
        flex-direction: column;
    }
`;

export default Login;
