import { createContext } from "react";

type UserContextType = {
    image: string,
    name: string,
    progress: number,
    setProgress: (progress: number) => void,
    token: string 
}

const UserContext = createContext<UserContextType>({
    image:'',
    name:'',
    progress: 0,
    setProgress: () => {},
    token:''
});

export default UserContext;