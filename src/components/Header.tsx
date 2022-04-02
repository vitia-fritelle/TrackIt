import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default () => {

    const {name,image} = useContext(UserContext);

    return (
        <Header> 
            TrackIt
            <img src={image} alt={name} />
        </Header>
    );
};

const Header = styled.header`
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;

    height: 70px;

    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    font-family: 'Playball';
    font-size: 38.982px;
    line-height: 49px;

    color: #FFFFFF;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    padding: 0 10px 0 18px;

    img {
        border-radius: 50%;
        height: 51px;
        width: 51px;
    }
`;