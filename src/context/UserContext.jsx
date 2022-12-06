import { useState, useEffect, createContext, useContext } from 'react'
import { useParams } from 'react-router-dom'
import photo from '../assets/default-pic-profile.png'
import { getTasksDb, getUser } from '../service/firestore'

const UserContext = createContext()
export const useUserContext = () => useContext(UserContext)

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUser()
        .then(resp => setUser({
            id: resp.id,
            ...resp.data()
        }))
        .finally(() => {
            setLoading(true)
        })
    },[])

    return (
        <UserContext.Provider value={{user,loading}}>
            {children}
        </UserContext.Provider>
    )
}

