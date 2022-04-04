import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";


export default () => {
    return (
        <>
            <Header/>
            <Main>
                <header>Histórico</header>
                <p>
                    Em breve você poderá ver o histórico dos 
                    seus hábitos aqui!
                </p>
            </Main>
            <Footer/>
        </>
    );
}

const Main = styled.main`
    position: relative;
    background-color: #E5E5E5;
    padding: 70px 17px;
    min-height: 100vh;
    box-sizing: border-box;

    margin-top: 28px;

    header {
        font-family: 'Lexend Deca';
        font-size: 22.976px;
        line-height: 29px;

        color: #126BA5;

        margin-bottom: 17px;
    }
    p {
        font-family: 'Lexend Deca';
        font-size: 17.976px;
        line-height: 22px;
        text-align: justify;
        color: #666666;
    }
`;