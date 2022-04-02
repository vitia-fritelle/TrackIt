import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import UserContext from "../contexts/UserContext";

export default () => {

    const {progress} = useContext(UserContext);

    return (
        <Footer> 
            <Link to='/habitos'>Hábitos</Link>
            <Link to='/hoje'>
                <CircularProgressbar value={progress} 
                                     text='Hoje' 
                                     background={true}
                                     backgroundPadding={6}
                                     styles={buildStyles({
                                         textSize: '17.976px',
                                         backgroundColor: '#52B6FF',
                                         textColor: '#FFFFFF',
                                         trailColor: '#52B6FF',
                                         pathColor: '#ffffff'
                                     })}/>
            </Link>
            <Link to='/historico'>Histórico</Link>
        </Footer>
    );
};

const Footer = styled.footer`
    position: fixed;
    z-index: 2;
    bottom: 0;
    left: 0;
    right: 0;

    font-family: 'Lexend Deca';
    font-size: 17.976px;
    line-height: 22px;

    height: 70px;

    background-color: #FFFFFF;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    padding: 0 31px 0 36px;

    a {
        text-decoration: none;
        color: #52B6FF;

        .CircularProgressbar {
            position: absolute;
            bottom: 10px;
            left: calc(50% - 91px/2);
            width: 91px;
            height: 91px;
        }
    }
`;