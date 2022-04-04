import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Checkbox } from "react-ionicons";
import styled from "styled-components";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import Footer from "../components/Footer";
import Header from "../components/Header";
import UserContext from "../contexts/UserContext";
import { TodayHabit } from "../types";

const weekDays = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
];

export default () => {
    const [habits, setHabits] = useState<Array<TodayHabit>>([]);

    const {token, progress, setProgress} = useContext(UserContext);

    const todayAxios = axios.create({
        baseURL: 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',
        headers: {'Authorization': `Bearer ${token}`}
    }) 

    useEffect(() => {
        (async () => {
            const URL = '/today';
            const {data}:{
                data: Array<TodayHabit>
            } = await todayAxios.get(URL);
            setHabits(data);
            setProgress(data.filter(({done}) => done).length/data.length*100);
        })();
    });

    const checkHabit = (id: number) => {
        const URL = `/${id}/check`
        todayAxios.post(URL);
    }

    const unCheckHabit = (id: number) => {
        const URL = `/${id}/uncheck`
        todayAxios.post(URL);
    }

    return (
        <>
            <Header/>
            <Main>
                <header>
                    <h2>
                        {`${weekDays[dayjs().day()]}, `}
                        {`${dayjs().format('DD/MM')}`}
                    </h2>
                    <h4 className={progress > 0?'green':''}>
                        {progress === 0
                         ?'Nenhum hábito concluído ainda'
                         :`${progress.toFixed(0)}% dos hábitos concluídos`}
                    </h4>
                </header>
                <ul>
                    {habits.map(({
                        id, name, currentSequence, 
                        highestSequence, done}) => 
                        <li key={id}>
                            <div className="title">
                                <h3>{name}</h3>
                                <h5 className={done?'green':''}>
                                    Sequência atual: 
                                    {` ${currentSequence}`} 
                                    {currentSequence > 1?' dias':' dia'}
                                </h5>
                                <h5 className={done && currentSequence === highestSequence
                                               ?'green'
                                               :''}>
                                    Seu recorde: 
                                    {` ${highestSequence}`} 
                                    {currentSequence > 1?' dias':' dia'}
                                </h5>
                            </div>
                            <Checkbox color={done?'#8FC549':'#EBEBEB'} 
                                      height="69px"
                                      width="69px"
                                      style={{cursor: 'pointer'}}
                                      onClick={() => done
                                                     ?unCheckHabit(id)
                                                     :checkHabit(id)}/>
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

    margin-top: 28px;

    header {
        margin-bottom: 28px;

        h2 {
            font-family: 'Lexend Deca';
            font-size: 22.976px;
            line-height: 29px;

            color: #126BA5;
        }

        h4 {
            font-family: 'Lexend Deca';
            font-size: 17.976px;
            line-height: 22px;

            color: #BABABA;
        }
    }

    ul {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;

        li {
            width: 100%;

            background: #FFFFFF;
            border-radius: 5px;

            padding: 13px;

            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;

            box-sizing: border-box;

            margin-bottom: 10px;

            .title {
                font-family: 'Lexend Deca';
                color: #666666;

                h3 {
                    font-size: 19.976px;
                    line-height: 25px;

                    margin-bottom: 7px;
                }

                h5 {
                    font-size: 12.976px;
                    line-height: 16px;
                }
            }
        }
    }

    .green {
        color: #8FC549;
    }
`;