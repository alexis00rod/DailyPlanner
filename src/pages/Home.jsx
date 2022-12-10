import { useState,useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import { getAllTasks, getCategoryTasks } from '../service/firestore'
import { Header } from '../components/Header'
import { Main } from '../components/Main'
import { TaskItem } from '../components/TaskItem'

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
    const [allTasks, setAllTasks] = useState([])
    const [workTasks, setWorkTasks] = useState([])
    const [personalTasks, setPersonalTasks] = useState([])
    const [otherTasks, setOtherTasks] = useState([])
    const [statusTasks, setStatusTasks] = useState(false)

    useEffect(() => {
        getAllTasks(userLogged,"created","desc",setAllTasks)
        getCategoryTasks(userLogged,"work","created","desc",setWorkTasks)
        getCategoryTasks(userLogged,"personal","created","desc",setPersonalTasks)
        getCategoryTasks(userLogged,"other","created","desc",setOtherTasks)
    },[])

    return <>
            <Header />
            <Main>
                {/* Filter category */}
                <div className='px-1 py-1 grid grid-cols-2 gap-2 sm:grid-cols-4'>
                    {[["/","Tasks",allTasks],["/work","Work",workTasks],["/personal","Personal",personalTasks],["/other","Other",otherTasks]].map(item => (
                        <NavbarLink to={item[0]}>
                            {item[1]} <span className='text-3xl'>{item[2].length}</span>
                        </NavbarLink>
                    ))}
                </div>
                {/* Filter status */}
                <div className='w-full px-1 py-1 flex items-center gap-2'>
                    <div className='input-radio'>
                        <input type="radio" name="priority" id="low" className="input-radio" onChange={() => setStatusTasks(false)} defaultChecked/>
                        <label htmlFor="low" className="">pending</label>
                    </div>
                    <div className='input-radio'>
                        <input type="radio" name="priority" id="medium" className="input-radio" onChange={() => setStatusTasks(true)}/>
                        <label htmlFor="medium" className="">finish</label>
                    </div>
                </div>
                {/* Tasks list */}
                <ul className='px-1 py-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-3 gap-2'>
                    {category === undefined
                    ?   tasksList(allTasks,statusTasks)
                    :   category === "work"
                        ?   tasksList(workTasks,statusTasks)
                        :   category === "personal"
                            ?   tasksList(personalTasks,statusTasks)
                            :   tasksList(otherTasks,statusTasks)
                    }
                </ul>
            </Main>
        </>
}
