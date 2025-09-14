import { createContext, useContext } from "react";
import useCurrentUser from "../Hooks/useCurrentUser";

const Context = createContext()

export const useAuthContext = () => useContext(Context)

export default function AuthContext({ children }) {
    const { currentUser } = useCurrentUser()
    
    return (
        <Context.Provider value={currentUser}>
            {
                currentUser.isFetched &&
                children
            }
        </Context.Provider>
    )
}
