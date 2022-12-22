import { useState,useEffect } from "react"
import { useUserContext } from "../context/UserContext"
import { getTasksCount } from "../service/firestore"
import { Link} from "react-router-dom"
import { Header, Main } from '../components/index'

export const Profile = () => {
    const {userLogged} = useUserContext()
    const [allTasks, setAllTasks] = useState([])
    
    const pendingTasks = allTasks.filter(e => e.completed === false)
    const completedTasks = allTasks.filter(e => e.completed === true)

    useEffect(() => {
        window.document.title = "Daily Planner | Perfil"
    },[])

    useEffect(() => {
        getTasksCount(userLogged,setAllTasks)
    },[userLogged])

    return (
        <>
            <Header title="Perfil" />
            <Main>
                {/* User info */}
                <div className="box">
                    <img src={userLogged.photoURL} alt={userLogged.displayName} className="mx-1 my-1 w-14 h-14 border-2 border-slate-600 rounded-full object-cover" />
                    <div className="px-2 py-2">
                        <h2 className="text-lg font-medium">{userLogged.displayName}</h2>
                        <h3 className="text-sm text-slate-500">{userLogged.email}</h3>
                    </div>
                </div>
                {/* User tasks info */}
                <ul className="box">
                    <li className="px-1 py-1"><Link to='/all' className="px-1 py-1">Todas las tareas: <span>{allTasks.length}</span></Link></li>
                    <li className="px-1 py-1"><Link to='/' className="px-1 py-1">Tareas pendientes: <span>{pendingTasks.length}</span></Link></li>
                    <li className="px-1 py-1"><Link to='/completed' className="px-1 py-1">Tareas finalizadas: <span>{completedTasks.length}</span></Link></li>
                </ul>
            </Main>
        </>
    )
}
