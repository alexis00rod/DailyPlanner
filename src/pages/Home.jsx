import { useState,useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import { getAllTasks, getCategoryTasks } from '../service/firestore'
import { Header } from '../components/Header'
import { Main } from '../components/Main'
import { TaskItem } from '../components/TaskItem'

export const Home = () => {
    const {userLogged} = useUserContext()
    const {category} = useParams()
    const [allTasks, setAllTasks] = useState([])
    const [workTasks, setWorkTasks] = useState([])
    const [personalTasks, setPersonalTasks] = useState([])
    const [otherTasks, setOtherTasks] = useState([])
    const [statusTasks, setStatusTasks] = useState(false)

    const tasksList = (tasks,completed) => {
        const tasksFilter = tasks.filter(e => e.completed === completed)
        return tasksFilter.map(item => <TaskItem key={item.id} item={item} />)
    }

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
                    <NavLink to='/' 
                    className={({isActive}) => isActive
                        ?   "h-24 flex flex-col items-center justify-center text text-slate-100 font-semibold bg-rose-300 rounded-lg"
                        :   "h-24 flex flex-col items-center justify-center text text-rose-300 font-semibold bg-slate-100 border-2 border-rose-300 rounded-lg"}>
                        Tasks <span className='text-3xl'>{allTasks.length}</span>
                    </NavLink>
                    <NavLink to='/work' 
                    className={({isActive}) => isActive
                        ?   "h-24 flex flex-col items-center justify-center text text-slate-100 font-semibold bg-violet-300 rounded-lg"
                        :   "h-24 flex flex-col items-center justify-center text text-violet-300 font-semibold bg-slate-100 border-2 border-violet-300 rounded-lg"}>
                        Work <span className='text-3xl'>{workTasks.length}</span>
                    </NavLink>
                    <NavLink to='/personal' 
                    className={({isActive}) => isActive
                        ?   "h-24 flex flex-col items-center justify-center text text-slate-100 font-semibold bg-yellow-300 rounded-lg"
                        :   "h-24 flex flex-col items-center justify-center text text-yellow-300 font-semibold bg-slate-100 border-2 border-yellow-300 rounded-lg"}>
                        Personal <span className='text-3xl'>{personalTasks.length}</span>
                    </NavLink>
                    <NavLink to='/other' 
                    className={({isActive}) => isActive
                        ?   "h-24 flex flex-col items-center justify-center text text-slate-100 font-semibold bg-teal-300 rounded-lg"
                        :   "h-24 flex flex-col items-center justify-center text text-teal-300 font-semibold bg-slate-100 border-2 border-teal-300 rounded-lg"}>
                        Other <span className='text-3xl'>{otherTasks.length}</span>
                    </NavLink>
                </div>
                {/* Filter status */}
                <div className='w-full px-1 py-1 flex items-center gap-2'>
                    <div className='input-radio'>
                        <input type="radio" name="priority" id="low" className="input-radio" onChange={() => setStatusTasks(false)} defaultChecked/>
                        <label htmlFor="low" className="">pending</label>
                    </div>
                    <div className='input-radio'>
                        <input type="radio" name="priority" id="medium" className="input-radio" onChange={(e) => setStatusTasks(true)}/>
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
