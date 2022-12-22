import { useState, useEffect } from 'react'
import { useUserContext } from '../context/UserContext'
import { NavLink, useParams } from 'react-router-dom'
import { useTasks } from '../hook/useTasks'
import { Header, Main, TaskList } from '../components/index'

const NavbarLink = ({children,...props}) => {
    return <NavLink {...props} 
                className={({isActive}) => `h-24 flex flex-col items-center justify-center text-slate-100 font-semibold duration-150 rounded-lg ${isActive ? "bg-teal-600" : "bg-teal-400  hover:bg-teal-500"} `}>
                    {children}
            </NavLink>
}

export const Home = () => {
    const { userLogged } = useUserContext()
    const { category } = useParams()
    const { allTasks, workTasks, personalTasks, otherTasks} = useTasks()
    const [filterTasks, setFilterTasks] = useState("today")

    useEffect(() => {
        window.document.title = "Daily Planner"
    },[])

    const handleFilterTasks = ({target:{value}}) => {
        setFilterTasks(value)
    }

    return <>
            <Header title={`Hola! ${userLogged.displayName}`} />
            <Main>
                {/* Filtrar por categorias */}
                <div className='px-1 py-1 grid grid-cols-2 gap-4 sm:grid-cols-4'>
                    {[["/","Tareas",allTasks],["/work","Trabajo",workTasks],["/personal","Personal",personalTasks],["/other","Otros",otherTasks]].map((item,i) => (
                        <NavbarLink to={item[0]} key={i}>
                            {item[1]} <span className='text-3xl'>{item[2].length}</span>
                        </NavbarLink>
                    ))}
                </div>
                {/* Filtrar por estado */}
                <div className='w-full px-1 py-1 flex items-center gap-2'>
                    {[["today","Hoy"],["pending","Pendiente"],["finish","Finalizado"],["all","Todo"]].map((e,i) => (
                       <div className='input-radio'>
                            {i === 0
                            ?   <input type="radio" name="filter" id={e[0]} value={e[0]} onChange={handleFilterTasks} defaultChecked/>
                            :   <input type="radio" name="filter" id={e[0]} value={e[0]} onChange={handleFilterTasks}/>}
                            <label htmlFor={e[0]}>{e[1]}</label>
                        </div> 
                    ))}
                </div>
                {/* Lista de tareas */}
                <TaskList category={category} filter={filterTasks} />
            </Main>
        </>
}
