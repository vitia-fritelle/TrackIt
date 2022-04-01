
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

import { Container } from './Login';

import logo from '../assets/images/logo.png';

export default () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(false);
    const browse = useNavigate();

    const signupAxios = axios.create({
        baseURL: 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/'
    }) 

    signupAxios.interceptors.request.use((config) => {
        setDisabled(true);
        return config;    
    }, (error) => {
        setDisabled(false);
        return Promise.reject(error);
    });

    const signup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const URL = 'auth/sign-up';
        const response = signupAxios.post(URL, {
            email,
            password,
            name,
            image
        });
        response.then(() => {
            setDisabled(false);
            browse('/');
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

            <form onSubmit={signup}>
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
                <input required
                        type="text"
                        value={name} 
                        placeholder="nome" 
                        onChange={e => setName(e.target.value)}
                        disabled={disabled}/>
                <input required
                        type="text"
                        value={image} 
                        placeholder="foto" 
                        onChange={e => setImage(e.target.value)}
                        disabled={disabled}/>
                <button type="submit" disabled={disabled}>
                    {disabled
                     ?<ThreeDots color="#FFFFFF" 
                                 height={45} 
                                 width={45} />
                     :'Cadastrar'}
                </button>
            </form>
            <Link to='/'>
                Já tem uma conta? Faça login!
            </Link>
        </Container>
    );
}