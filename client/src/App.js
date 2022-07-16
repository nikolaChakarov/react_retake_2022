import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Navigation from "./components/navigation/Navigation";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Footer from "./components/footer/Footer";

const App = () => {
    return (
        <AppContainer className="app-container">
            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
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
