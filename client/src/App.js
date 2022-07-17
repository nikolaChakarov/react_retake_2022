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

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
            <Footer />
        </AppContainer>
    );
};

const AppContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

export default App;
