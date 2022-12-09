import { useState,useEffect } from 'react'
import { useUserContext } from '../context/UserContext'
import { getDayTasks } from '../service/firestore'
import { Header } from "../components/Header"
import { TaskItem } from "../components/TaskItem"
import { Loader } from '../components/Loader'
import { Main } from '../components/Main'

const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
const months = ["january","february","march","april","may","june","july","august","september","october","november","december"]

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

export const Calendar = () => {
    const {userLogged} = useUserContext()
    const [day, setDay] = useState(new Date())
    const [dayTasks, setDayTasks] = useState([])

    const handleDayTasks = ({target:{value}}) => {
        setDay(convertStringToDate(value))
    }

    useEffect(() => {
        getDayTasks(userLogged,convertDateToString(day),setDayTasks)
    },[userLogged,day])

    return (
        <>
            <Header title="Calendar" />
            <Main>
                {/* Calendar */}
                <div className="box">
                    <div className='w-full px-2 py-2 flex items-center gap-4'>
                        <div className='px-1 py-1 flex flex-col grow'>
                            <h3 className='px-1 text-lg text-slate-700 capitalize'>{`${months[day.getMonth()]}, ${day.getFullYear()}`}</h3>
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
                {/* Tasks day */}
                <ul className='grow grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-3 gap-4'>
                    {dayTasks.map(item => <TaskItem key={item.id} item={item} />)}
                </ul>
            </Main>
        </>
    )
}
