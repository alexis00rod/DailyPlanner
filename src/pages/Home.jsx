import { useState,useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import { getTasksDb } from '../service/firestore'
import { Header } from '../components/Header'
import { TaskItem } from '../components/TaskItem'

const NavbarLink = ({children,...props}) => {
    return (
        <NavLink 
        {...props}
        className={({isActive}) => `px-4 h-8 flex items-center capitalize font-semibold duration-150 rounded-full ${isActive ? "bg-cyan-500 text-slate-100 hover:bg-cyan-600" : "bg-transparent text-slate-600 hover:text-slate-900"}`}
        >
            {children}
        </NavLink>
    )
}

const taskList = (tasks) => tasks.map(item => <TaskItem key={item.id} item={item} />)

export const Home = () => {
    const {userLogged} = useUserContext()
    const {completed} = useParams()

    const [allTasks, setAllTasks] = useState([])
    const [pendingTasks, setPendingTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])

    useEffect(() => {
        completed === undefined
        ?   getTasksDb(userLogged,"created","desc",setPendingTasks,completed)
        :   completed === "completed"
            ?   getTasksDb(userLogged,"created","desc",setCompletedTasks,completed)
            :   getTasksDb(userLogged,"created","desc",setAllTasks,completed)

    },[userLogged,completed])

    return (
        <>
            <Header />
            <main className='w-full px-2 py-2 flex flex-col grow'>
                <div className='container mx-auto flex flex-col gap-2'>
                    {/* Status filter */}
                    <div className='py-2 flex items-center gap-2'>
                        {[["","pending"],["completed","completed"],["all","all"]].map((e,i) => <NavbarLink key={i} to={`/${e[0]}`}>{e[1]}</NavbarLink>)}
                    </div>
                    {/* Tasks list */}
                    <ul className='py-1 grow grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-2 lg:gap-4'>
                        {taskList(completed === undefined ? pendingTasks : completed === "completed" ? completedTasks : allTasks)}
                    </ul>
                </div>
            </main>
        </>
    )
}
