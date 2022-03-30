import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import styled from 'styled-components';

const GeneralStyles = styled.div`
    font-family: 'Lexend Deca', sans-serif;
`;

ReactDOM.render(
    <React.StrictMode>
        <GeneralStyles>
            <App />
        </GeneralStyles>
    </React.StrictMode>,
    document.getElementById('root')
);

