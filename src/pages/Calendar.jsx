import { useState,useEffect } from 'react'
import { Header } from "../components/Header"
import { TaskItem } from "../components/TaskItem"
import { useUserContext } from '../context/UserContext'
import { useTasks } from "../hooks/useTasks"
import { getDayTasks } from '../service/firestore'

const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
const months = ["january","february","march","april","may","june","july","august","september","october","november","december"]

const todayIs = new Date()

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
    const {user} = useUserContext()
    const{ tasks } = useTasks()
    const [day, setDay] = useState(new Date())
    const [dayTasks, setDayTasks] = useState([])

    const handleDayTasks = ({target:{value}}) => {
        setDay(convertStringToDate(value))
    }

    useEffect(() => {
        getDayTasks(user,convertDateToString(day),setDayTasks)
    },[day])

    console.log(day)

    return (
        <section className="flex flex-col grow overflow-y-scroll">
            <Header title="Calendar" />
            <main className="w-full px-2 py-2 flex flex-col grow">
                <div className="container mx-auto flex flex-col gap-2">
                    <div className="w-full h-max px-2 py-2 flex flex-row items-center gap-2 bg-slate-100 rounded-lg shadow-lg">
                        <div className='w-max px-1 py-1'>
                            <h3 className='px-1 capitalize'>{`${months[day.getMonth()]}, ${day.getFullYear()}`}</h3>
                            <h2 className='px-1 py-1 text-4xl font-semibold uppercase'>{`${days[day.getDay()]} ${day.getDate()}`}</h2>
                        </div>
                        <div class="input-date">
                            <button className='absolute left-0 top-0 w-full h-full rounded-lg bg-red-500 text-slate-100'>
                                <i className="fa-solid fa-calendar"></i>
                            </button>
                            <input type="date" defaultValue={convertDateToString(day)} onChange={handleDayTasks}/>
                        </div>
                    </div>
                    <ul className='py-1 grow grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-2 lg:gap-4'>
                        {dayTasks.map(item => <TaskItem key={item.id} item={item} />)}
                    </ul>
                </div>
            </main>
        </section>
    )
}
