import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UserContext from "../contexts/UserContext";
import { TrashBinOutline } from 'react-ionicons';


type Habit = {
    id: number,
    name: string,
    days: Array<number>
}

export default () => {
    
    const [habits, setHabits] = useState<Array<Habit>>([]);

    const {token} = useContext(UserContext);

    useEffect(() => {
        (async () => {
            const config = {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            }
            const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits'
            const {data: newHabits} = await axios.get(URL,config);
            setHabits(newHabits);
        })();
    });

    const weekDays = ['D','S','T','Q','Q','S','S'];

    return (
        <>
            <Header/>
            <Main>
                <div>
                    Meus hábitos
                    <button>+</button>
                </div>
                <ul>
                    {habits.length === 0?
                    'Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!'
                    :habits.map(({id,name,days}) => 
                    <li key={id}>
                        {name}
                        <ul>
                            {weekDays.map((day, index) => 
                                days.find(element => element === index)
                                ?<li key={index} className="marked">{day}</li>
                                :<li key={index}>{day}</li>
                            )}
                        </ul>
                        <TrashBinOutline cssClasses={'delete-button'}
                                         onClick={() => {}}/>
                    </li>)}            
                </ul>
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

    margin-top: 22px;

    div {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;

        font-family: 'Lexend Deca';
        font-size: 22.976px;
        line-height: 29px;

        margin-bottom: 28px;

        color: #126BA5;

        button {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;

            background-color: #52B6FF;
            border-radius: 4.63636px;
            border: none;

            font-family: 'Lexend Deca';
            font-size: 26.976px;
            line-height: 34px;

            text-align: center;

            color: #FFFFFF;

            width: 40px;
            height: 35px;

            box-sizing: border-box;
        }
    }

    ul {
        font-family: 'Lexend Deca';
        font-size: 17.976px;
        line-height: 22px;
        text-align: justify;

        color: #666666;

        li {
            background: #FFFFFF;
            border-radius: 5px;

            padding: 13px 75px 15px 14px;
            box-sizing: border-box;
            width: 100%;

            position: relative;

            .delete-button {
                position: absolute;
                right: 10px;
                top: 11px;

                cursor: pointer;
                z-index: 3;
            }

            ul {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: flex-start;

                margin-top: 8px;

                li {
                    padding: 0;
                    margin-right: 4px;
                    width: 30px;
                    height: 30px;

                    background-color: #FFFFFF;
                    border: 1px solid #D5D5D5;
                    border-radius: 5px;

                    font-family: 'Lexend Deca';
                    font-size: 19.976px;
                    line-height: 25px;

                    color: #DBDBDB;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .marked {
                    background-color: #CFCFCF;
                    border-color: #CFCFCF;

                    color: #FFFFFF;
                }
            }
        }
    }
`;