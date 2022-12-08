import { Navigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"

export const ProtectedRoutes = ({children}) => {
    const {userLogged} = useUserContext()
    if(!userLogged) return <Navigate to='/login' />
    return children
}