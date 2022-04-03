import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import UserContext from './contexts/UserContext';
import Habits from './pages/Habits';
import History from './pages/History';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Today from './pages/Today';

export default () => {
    const [image, setImage] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [progress, setProgress] = useState<number>(0);
    const [token, setToken] = useState<string>('');

    return (
        <UserContext.Provider value={{image, name, progress, setProgress, token}}> 
            <BrowserRouter>
                <Routes>
                    <Route path='/' 
                        element={
                                <Login setName={setName}
                                       setImage={setImage}  
                                       setToken={setToken}/>
                        }/>
                    <Route path='/cadastro' element={<SignUp/>}/>
                    <Route path='/habitos' element={<Habits/>}/>
                    <Route path='/hoje' element={<Today/>}/>
                    <Route path='/historico' element={<History/>}/>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
};
