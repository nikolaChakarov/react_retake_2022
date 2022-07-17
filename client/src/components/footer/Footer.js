import styled from "styled-components";

const Footer = () => {
    return (
        <FooterContainer className="footer-container">
            <span>Nikola Chakarov</span> &copy; 2022
        </FooterContainer>
    );
};

const FooterContainer = styled.div`
    margin-top: auto;
    display: flex;
    padding: 10px 20px;
    justify-content: center;
    border-top: 1px groove #fff;
    color: var(--gray);
    font-size: 14px;
    span {
        font-weight: 500;
    }
`;

export default Footer;
