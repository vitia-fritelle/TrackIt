import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Footer from "../components/Footer";
import Header from "../components/Header";
import UserContext from "../contexts/UserContext";
import { Historyc } from "../types";

export default () => {

    const[history, setHistory] = useState<Array<Historyc>>([]);

    const {token} = useContext(UserContext);

    const config = {
        headers: {'Authorization': `Bearer ${token}`}
    }

    useEffect(() => {
        (async () => {
            const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily';
            const {data}: {data: Array<Historyc>} = await axios.get(URL,config);
            setHistory(data);
        })();
    })

    const styleDays = ({date, view}: {date: Date, view: string}) => {
        const today = new Date();
        if(today.getDate() === date.getDate() 
           && today.getMonth() === date.getMonth() 
           && today.getFullYear() === date.getFullYear()) {
            return '';
        }
        if (view === 'month') {
            if(history.find(({day: dateObject, habits}) => {
                const [day, month, year] = dateObject.split('/').map(text => Number(text));
                return day === date.getDate() 
                       && month === (date.getMonth()+1) 
                       && year === date.getFullYear() 
                       && habits.every(({done}) => done);
                    })) {
                return 'green';        
            } else if(history.find(({day: dateObject}) => {
                const [day, month, year] = dateObject.split('/').map(text => Number(text));
                return day === date.getDate() 
                       && month === (date.getMonth()+1) 
                       && year === date.getFullYear();
                    })) {
                return 'red';
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    const showHabits = (value: Date) => {
        const today = new Date();
        if(today.getDate() === value.getDate() 
           && today.getMonth() === value.getMonth() 
           && today.getFullYear() === value.getFullYear()) {
            return '';
        }
        const milestone = history.find(({day: dateObject}) => {
            const [day, month, year] = dateObject.split('/').map(text => Number(text));
            return day === value.getDate() 
                   && month === (value.getMonth()+1) 
                   && year === value.getFullYear();
        }); 
        if(milestone) {
            const msg = milestone.habits.map(({name, done}) => `Hábito ${name}: ${done?'feito':'não feito'}`);
            alert(msg.join('\n'));
        }
    }

    return (
        <>
            <Header/>
            <Main>
                <header>Histórico</header>
                <Calendar className='calendar'
                          locale='pt-br'
                          tileClassName={styleDays}
                          onClickDay={showHabits}/>
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
    .calendar {
        border-radius: 10px;
        margin: 0 auto;
        min-height: 402px;
        border: none;
    }

    .green {
        background-color: #8CC654;
        border-radius: 50%;
    }

    .red {
        background-color: #EA5766;
        border-radius: 50%;
    }
`;