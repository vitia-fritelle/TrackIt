import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';

import logo from '../assets/images/logo.png';

export default ({setName, setImage}: {
    setName: (name: string) => void,
    setImage: (name: string) => void
}) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(false);
    const browse = useNavigate();

    const loginAxios = axios.create({
        baseURL: 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/'
    }) 

    loginAxios.interceptors.request.use((config) => {
        setDisabled(true);
        return config;    
    }, (error) => {
        setDisabled(false);
        return Promise.reject(error);
    });

    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const URL = 'auth/login';
        const response = loginAxios.post(URL, {
            email,
            password
        });
        response.then(({data}) => {
            setDisabled(false);
            setImage(data.image);
            setName(data.name);
            browse('/hoje');
        });
        response.catch(() => {
            setDisabled(false);
            alert('Algo não deu certo :(');
        });
    };

    return (
        <Container>
            <figure>
                <img src={logo} alt="logo"/>
                <figcaption>
                    TrackIt
                </figcaption>
            </figure>
            <form onSubmit={login}>
                <input required
                        type="email" 
                        value={email}
                        placeholder="email" 
                        onChange={e => setEmail(e.target.value)}
                        disabled={disabled}/>
                <input required
                        type="password"
                        value={password} 
                        placeholder="senha" 
                        onChange={e => setPassword(e.target.value)}
                        disabled={disabled}/>
                <button type="submit" disabled={disabled}>
                    {disabled
                     ?<ThreeDots color="#FFFFFF" 
                                 height={45} 
                                 width={45} />
                     :'Entrar'}
                </button>
            </form>
            <Link to='/cadastro'>
                Não tem uma conta? Cadastre-se!
            </Link>
        </Container>
    );
}

export const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    
    figure {
        
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        margin-top: 68px;
        margin-bottom: 32px;

        img {
            width: 154.94px;
        }

        figcaption {

            font-family: 'Playball', cursive;
            font-size: 68.982px;
            line-height: 86px;

            text-align: center;

            color: #126BA5;
        }
    }

    form {

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        
        margin-bottom: 25px;

        input {
            width: 303px;
            height: 45px;
    
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            box-sizing: border-box;
            border-radius: 5px;

            font-family: 'Lexend Deca';
            font-size: 19.976px;
            line-height: 25px;

            margin-bottom: 6px;
            padding: 9px 11px 11px 11px;

            ::placeholder {
                color: #DBDBDB;
            }

            &[disabled] {
                background: #F2F2F2;
                border: 1px solid #D5D5D5;
                box-sizing: border-box;
                border-radius: 5px;

                ::placeholder {
                    color: #AFAFAF;
                }
            }
        }
    
        button {
            cursor: pointer;

            width: 303px;
            height: 45px;
    
            background: #52B6FF;
            border: none;
            border-radius: 4.63636px;

            font-family: 'Lexend Deca';
            font-size: 20.976px;
            line-height: 26px;
            text-align: center;

            color: #FFFFFF;

            &[disabled] {
                cursor: default;
                opacity: 0.7;

                display: flex;
                justify-content: center;
                align-items:center;
            }
        }
    }

    a {
        font-family: 'Lexend Deca';
        font-size: 13.976px;
        line-height: 17px;

        color: #52B6FF;
    }
`;