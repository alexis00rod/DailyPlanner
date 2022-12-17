import { useState,useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import { Header, Main, TaskItem } from '../components/index'
import { useTasks } from '../hook/useTasks'

const tasksList = (tasks,completed) => {
    const tasksFilter = tasks.filter(e => e.completed === completed)
    return tasksFilter.map(item => <TaskItem key={item.id} item={item} />)
}

const NavbarLink = ({children,...props}) => {
    return <NavLink {...props} 
                className={({isActive}) => `h-24 flex flex-col items-center justify-center text-slate-100 font-semibold duration-150 rounded-lg ${isActive ? "bg-teal-600" : "bg-teal-400  hover:bg-teal-500"} `}>
                    {children}
            </NavLink>
}

export const Home = () => {
    const {userLogged} = useUserContext()
    const {category} = useParams()
    const {allTasks,workTasks,personalTasks,otherTasks} = useTasks()
    const [statusTasks, setStatusTasks] = useState(false)

    return <>
            <Header title={`Hola! ${userLogged.displayName}`} />
            <Main>
                {/* Filtrar por categorias */}
                <div className='px-1 py-1 grid grid-cols-2 gap-2 sm:grid-cols-4'>
                    {[["/","Tareas",allTasks],["/work","Trabajo",workTasks],["/personal","Personal",personalTasks],["/other","Otros",otherTasks]].map((item,i) => (
                        <NavbarLink to={item[0]} key={i}>
                            {item[1]} <span className='text-3xl'>{item[2].length}</span>
                        </NavbarLink>
                    ))}
                </div>
                {/* Filtrar por estado */}
                <div className='w-full px-1 py-1 flex items-center gap-2'>
                    <div className='input-radio'>
                        <input type="radio" name="status" id="pending" className="input-radio" onChange={() => setStatusTasks(false)} defaultChecked/>
                        <label htmlFor="pending">Pendiente</label>
                    </div>
                    <div className='input-radio'>
                        <input type="radio" name="status" id="finish" className="input-radio" onChange={() => setStatusTasks(true)}/>
                        <label htmlFor="finish">Finalizado</label>
                    </div>
                </div>
                {/* Lista de tareas */}
                <ul className='px-1 py-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-2'>
                    {category === undefined
                    ?   tasksList(allTasks,statusTasks)
                    :   category === "work"
                        ?   tasksList(workTasks,statusTasks)
                        :   category === "personal"
                            ?   tasksList(personalTasks,statusTasks)
                            :   tasksList(otherTasks,statusTasks)
                    }
                    {/*                     
                        !category && tasksList(allTasks,statusTasks)
                        category === "work" && tasksList(workTasks,statusTasks)
                        category === "personal" && tasksList(personalTasks,statusTasks)
                        category === "other" && tasksList(otherTasks,statusTasks)
                     */}
                </ul>
            </Main>
        </>
}
