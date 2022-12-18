import { NavLink, useParams } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import { Header, Main, TaskList } from '../components/index'
import { useTasks } from '../hook/useTasks'
import { useState } from 'react'

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
                    <div className='input-radio'>
                        <input type="radio" name="filter" id="today" value="today" onChange={handleFilterTasks}  defaultChecked/>
                        <label htmlFor="today">Hoy</label>
                    </div>
                    <div className='input-radio'>
                        <input type="radio" name="filter" id="pending" value="pending" onChange={handleFilterTasks} />
                        <label htmlFor="pending">Pendiente</label>
                    </div>
                    <div className='input-radio'>
                        <input type="radio" name="filter" id="finish" value="finish" onChange={handleFilterTasks} />
                        <label htmlFor="finish">Finalizado</label>
                    </div>
                </div>
                {/* Lista de tareas */}
                <TaskList category={category} filter={filterTasks} />
            </Main>
        </>
}
