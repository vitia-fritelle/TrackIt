import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";


export default () => {
    return (
        <>
            <Header/>
            <Main>
                {Array(1).fill(<p>Hoje</p>)}
            </Main>
            <Footer/>
        </>
    );
}

const Main = styled.main`
    position: relative;
    background: #E5E5E5;
    padding: 70px 17px;
    min-height: 100vh;
    box-sizing: border-box;
`;