import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Navigation from "./components/navigation/Navigation";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Footer from "./components/footer/Footer";
import Logout from "./components/logout/Logout";

const App = () => {
    return (
        <AppContainer className="app-container">
            <Navigation />

            <div className="app-wrapper">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </div>
            <Footer />
        </AppContainer>
    );
};

const AppContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;

    .app-wrapper {
        overflow-y: scroll;
        display: flex;
        justify-content: center;

        &::-webkit-scrollbar {
            display: none;
        }
    }
`;

export default App;
