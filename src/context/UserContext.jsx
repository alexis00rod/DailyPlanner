import { useState, useEffect, createContext, useContext } from 'react'
import { stateAuth } from '../service/auth'

const UserContext = createContext()
export const useUserContext = () => useContext(UserContext)

export const UserProvider = ({children}) => {
    const [userLogged, setUserLogged] = useState()

    useEffect(() => {
        stateAuth(setUserLogged)
    },[])

    return (
        <UserContext.Provider value={{userLogged}}>
            {children}
        </UserContext.Provider>
    )
}

