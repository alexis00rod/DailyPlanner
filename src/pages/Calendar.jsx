import { useState,useEffect } from 'react'
import { useUserContext } from '../context/UserContext'
import { Header, Main, TaskItem } from '../components/index'
import { getDayTasks } from '../service/firestore'

const days = ["domingo","lunes","martes","miercoles","jueves","viernes","sabado"]
const months = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]

const convertDateToString = (value) => {
    let year = value.getUTCFullYear()
    let month = ("0"+(value.getUTCMonth()+1)).slice(-2)
    let day = ("0" + value.getUTCDate()).slice(-2)

    return `${year}-${month}-${day}`
}

const convertStringToDate = (value) => {
    let date = new Date(value)
    let year = date.getUTCFullYear()
    let month = date.getUTCMonth()
    let day = date.getUTCDate()
    return new Date(year,month,day)
}

const tasksList = (tasks,completed) => {
    const tasksFilter = tasks.filter(e => e.completed === completed)
    return tasksFilter.map(item => <TaskItem key={item.id} item={item} />)
}

export const Calendar = () => {
    const {userLogged} = useUserContext()
    const [day, setDay] = useState(new Date())
    const [dayTasks, setDayTasks] = useState([])
    const [statusTasks, setStatusTasks] = useState(false)

    const handleDayTasks = ({target:{value}}) => {
        setDay(convertStringToDate(value))
    }

    useEffect(() => {
        window.document.title = "Daily Planner | Calendario"
    },[])

    useEffect(() => {
        getDayTasks(userLogged,convertDateToString(day),setDayTasks)
    },[userLogged,day])

    return (
        <>
            <Header title="Calendario" />
            <Main>
                {/* Calendario */}
                <div className="box">
                    <div className='w-full px-2 py-2 flex items-center gap-4'>
                        <div className='px-1 py-1 flex flex-col grow'>
                            <h3 className='px-1 text-lg text-slate-600 dark:text-slate-400 capitalize'>{`${months[day.getMonth()]}, ${day.getFullYear()}`}</h3>
                            <h2 className='px-1 text-4xl font-semibold uppercase'>{`${days[day.getDay()]} ${day.getDate()}`}</h2>
                        </div>
                        <div className="input-date">
                            <button className='absolute left-0 top-0 w-full h-full rounded-lg bg-red-500 text-slate-100'>
                                <i className="fa-solid fa-calendar"></i>
                            </button>
                            <input type="date" defaultValue={convertDateToString(day)} onChange={handleDayTasks}/>
                        </div>
                    </div>
                </div>
                {/* Filtrar por estado */}
                <div className='w-full px-1 py-1 flex items-center gap-2'>
                    <div className='input-radio'>
                        <input type="radio" name="status" id="pending" className="input-radio" onChange={() => setStatusTasks(false)} defaultChecked/>
                        <label htmlFor="pending" className="">Pendiente</label>
                    </div>
                    <div className='input-radio'>
                        <input type="radio" name="status" id="finish" className="input-radio" onChange={() => setStatusTasks(true)}/>
                        <label htmlFor="finish" className="">Finalizado</label>
                    </div>
                </div>
                {/* Tareas del dia */}
                <ul className='px-1 py-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {tasksList(dayTasks,statusTasks)}
                </ul>
            </Main>
        </>
    )
}
