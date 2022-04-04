import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { TrashBinOutline } from 'react-ionicons';
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UserContext from "../contexts/UserContext";
import { Habit } from "../types";

const weekDays = ['D','S','T','Q','Q','S','S'];

export default () => {
    
    const [habits, setHabits] = useState<Array<Habit>>([]);
    const [addingHabit, setAddingHabit] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [days, setDays] = useState<Array<number>>([]); 

    const {token} = useContext(UserContext);

    const habitAxios = axios.create({
        baseURL: 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',
        headers: {'Authorization': `Bearer ${token}`}
    }) 

    const getHabits = async () => {
        const URL = '';
        const {data: newHabits} = await habitAxios.get(URL);
        setHabits(newHabits);
    }

    const deleteHabit = async (id: number) => {
        const answer = window.confirm('Você realmente gostaria de apagar esse hábito?');
        
        if(answer) {
            const URL = `/${id}`;
            await habitAxios.delete(URL);
            await getHabits();
        }
    }
    
    useEffect(() => {
        getHabits();
    });

    return (
        <>
            <Header/>
            <Main>
                <header>
                    Meus hábitos
                    <button onClick = {() => setAddingHabit(!addingHabit)}>
                        +
                    </button>
                </header>
                {addingHabit?<AddHabit name={name}
                                       days={days}
                                       setName={setName}
                                       setDays={setDays}
                                       close={() => setAddingHabit(false)}
                                       habitAxios={habitAxios}/>:''}
                <ul>
                    {habits.length === 0
                    ?'Você não tem nenhum hábito cadastrado ainda. '
                     +'Adicione um hábito para começar a trackear!'
                    :habits.map(({id,name,days}) => 
                        <li key={id}>
                            {name}
                            <ul>
                                {weekDays.map((day, index) => 
                                    typeof days.find(element => element === index) !== 'undefined'
                                    ?<li key={index} className="marked">{day}</li>
                                    :<li key={index}>{day}</li>
                                )}
                            </ul>
                            <TrashBinOutline cssClasses={'delete-button'}
                                             onClick={() => deleteHabit(id)}/>
                        </li>)}            
                </ul>
            </Main>
            <Footer/>
        </>
    );
}

const AddHabit = (props: any) => {

    const [loading, setLoading] = useState<boolean>(false);

    const clear = () => {
        props.setDays([]);
        props.setName('');
    }
    
    const addHabit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            name: props.name, 
            days: props.days
        }
        const URL = '';
        const response = props.habitAxios.post(URL, data);
        response.then(() => {
            clear();
            setLoading(false);
            props.close();
        });
        response.catch((error: { message: any }) => {
            setLoading(false);
            alert(error.message);
        });
        
    }
    
    const action = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, id: number) => {
        const day = e.currentTarget;
        day.classList.toggle('marked');
        if(day.classList.contains('marked')){
            props.setDays([...props.days, id]);
        } else {
            props.setDays(props.days.filter((element: number) => element !== id));
        }
    }
    
    return (
        <Form onSubmit={addHabit}>
            <input type="text" 
                   value={props.name} 
                   placeholder="nome do hábito"
                   onChange={(e) => props.setName(e.target.value)}
                   disabled={loading} />
            <ul>
                {weekDays.map((day, index) => 
                    <li className={typeof props.days.find((element: number) => element === index) !== 'undefined'
                                   ?'marked'
                                   :''}
                        key={index} 
                        onClick={(e) => !loading && action(e, index)}>
                        {day}
                    </li>
                )}
            </ul>
            <div>
                <button onClick={props.close}>Cancelar</button>
                <button type="submit" disabled={loading}>
                    {loading
                     ? <ThreeDots color="#FFFFFF" 
                                  height={45} 
                                  width={45} />
                     :'Salvar'}
                </button>
            </div>
        </Form>
    );
}

const Main = styled.main`
    position: relative;
    background: #E5E5E5;
    padding: 70px 17px;
    min-height: 100vh;
    box-sizing: border-box;

    margin-top: 22px;

    header {
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

            margin-bottom: 10px;

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

const Form = styled.form`
    background: #FFFFFF;
    border-radius: 5px;
    width: 100%;

    margin-bottom: 29px;

    padding: 18px 18px 15px 18px;
    box-sizing: border-box;

    input {
        margin-bottom: 10px;

        width: 100%;
        height: 45px;

        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;

        color: #666666;

        font-size: 19.976px;
        line-height: 25px;

        ::placeholder {
            font-family: 'Lexend Deca';
            font-size: 19.976px;
            line-height: 25px;

            color: #DBDBDB;

            padding: 9px 11px 11px 11px;
        }

        &[disabled] {
            background-color: #F2F2F2;
            border-color: #D5D5D5;

            color: #B3B3B3;
        }
    }

    div {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: center;

        button {
            cursor: pointer;
            width: 84px;
            height: 35px;

            font-family: 'Lexend Deca';
            font-size: 15.976px;
            line-height: 20px;

            text-align: center;

            color: #52B6FF;
            background-color: #ffffff;
            border-radius: 4.63636px;
            border: none;

            display: flex;
            justify-content: center;
            align-items: center;

            &[type="submit"] {
                color: #FFFFFF;
                background-color: #52B6FF;
                margin-left: 10px;
            }
        }
    }

    ul {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;

        margin-bottom: 29px;

        li {
            cursor: pointer;
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
`;