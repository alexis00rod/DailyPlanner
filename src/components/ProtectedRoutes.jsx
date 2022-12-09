import { Navigate, useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import { Loader } from "./Loader"

export const ProtectedRoutes = ({children}) => {
    const {userLogged} = useUserContext()
    if(userLogged === null) return <Navigate to='/login' />
    if(userLogged === undefined) return <Loader />
    return children
}