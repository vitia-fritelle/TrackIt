import { createContext } from "react";

type UserContextType = {
    image: string,
    name: string,
    progress: number,
    setProgress: (progress: number) => void 
}

const UserContext = createContext<UserContextType>({
    image:'',
    name:'',
    progress: 0,
    setProgress: () => {}
});

export default UserContext;