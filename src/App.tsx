import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Habits from './pages/Habits';
import History from './pages/History';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Today from './pages/Today';

export default () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/cadastro' element={<SignUp/>}/>
                <Route path='/habitos' element={<Habits/>}/>
                <Route path='/hoje' element={<Today/>}/>
                <Route path='/historico' element={<History/>}/>
            </Routes>
        </BrowserRouter>
    );
};
