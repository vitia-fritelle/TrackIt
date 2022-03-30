import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

export default () => {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [loading] = useState<boolean>(false);
    const browse = useNavigate();

    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login';
        const response = axios.post(URL, {
            email,
            password
        });
        response.then(() => browse('/hoje'));
        response.catch(() => alert('houve um erro :('));
    };

    if(loading) {
        return (null);
    } else {
        return (
            <>
                <form onSubmit={login}>
                    <input required
                           type="email" 
                           value={email}
                           placeholder="email" 
                           onChange={e => setEmail(e.target.value)}/>
                    <input required
                           type="password"
                           value={password} 
                           placeholder="senha" 
                           onChange={e => setPassword(e.target.value)}/>
                    <button type="submit">Entrar</button>
                </form>
                <Link to='/cadastro'>
                    Não tem uma conta? Cadastre-se!
                </Link>
            </>
        );
    }
    
}