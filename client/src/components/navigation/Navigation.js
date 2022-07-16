import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../../context/GlobalState";

const Navigation = () => {
    const { user } = useContext(GlobalContext);

    const [menuLinks, setMenuLinks] = useState([]);

    useEffect(() => {
        user
            ? setMenuLinks(["home", "galery", "logout"])
            : setMenuLinks(["home", "galery", "login"]);
    }, [user]);

    return (
        <NavigationContainer className="navigation-container">
            <div className="logo">PETS</div>
            <ul>
                {menuLinks.map((link, idx) => (
                    <li key={idx}>
                        <Link to={`/${link}`}>{link}</Link>
                    </li>
                ))}
            </ul>
        </NavigationContainer>
    );
};

const NavigationContainer = styled.div`
    display: flex;
    padding: 10px 20px;
    background-color: var(--yellow);
    align-items: center;

    .logo {
        flex: 1;
        font-weight: 900;
        color: #fff;
    }

    ul {
        display: flex;
        gap: 10px;

        a {
            color: #fff;
            font-variant: small-caps;
            font-size: 18px;
            border-right: 1px solid #fff;
            padding-right: 10px;
        }

        li {
            &:last-of-type {
                a {
                    border-right: none;
                    padding-right: 0;
                }
            }
        }
    }
`;

export default Navigation;
