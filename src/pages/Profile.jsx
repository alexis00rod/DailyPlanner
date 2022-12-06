import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Header } from "../components/Header"
import { useUserContext } from "../context/UserContext"
import { getTasksCount } from "../service/firestore"

export const Profile = () => {
    const {user} = useUserContext()

    const [allTasks, setAllTasks] = useState([])
    
    const pendingTasks = allTasks.filter(e => e.completed === false)
    const completedTasks = allTasks.filter(e => e.completed === true)

    useEffect(() => {
        getTasksCount(user,setAllTasks)
    },[])

    return (
        <section className="flex flex-col grow overflow-y-scroll">
            <Header title="Profile" />
            <main className="w-full px-2 py-2 flex flex-col grow">
                <div className="container mt-2 mx-auto px-1 py-1 flex flex-col gap-4">
                    <div className="mt-2 px-2 py-3 flex flex-row gap-2 bg-slate-100 rounded-lg shadow-md">
                        <img src={user.photo} alt={user.email} className="mx-1 my-1 w-14 h-14 border-2 border-slate-600 rounded-full object-cover" />
                        <div className="px-2 py-2">
                            <h2 className="text-lg font-medium">{user.name}</h2>
                            <h3 className="text-sm text-slate-500">{user.email}</h3>
                        </div>
                    </div>
                    <div className="px-2 py-3 flex flex-col gap-2 bg-slate-100 rounded-lg shadow-md">
                        <ul className="px-1 py-1 flex flex-col gap-1">
                            <li className="px-1 py-1"><Link to='/'>All tasks: <span>{allTasks.length}</span></Link></li>
                            <li className="px-1 py-1"><Link to='/'>Pending tasks: <span>{pendingTasks.length}</span></Link></li>
                            <li className="px-1 py-1"><Link to='/'>Completed tasks: <span>{completedTasks.length}</span></Link></li>
                        </ul>
                    </div>
                </div>
            </main>
        </section>
    )
}
