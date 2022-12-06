import { useState} from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import { completeTaskDb, deleteTaskDb } from '../service/firestore'

export const TaskItem = ({item:{id,title,description,day,category,priority,completed}}) => {
    const { user } = useUserContext()
    const [menu, setMenu] = useState(false)

    const handleMenu = (e) => {
        setMenu(!menu)
    }

    const completeTask = () => {
        completeTaskDb(user,id,completed)
    }

    const deleteTask = () => {
        deleteTaskDb(user,id)
    }

    return (
        <li className="flex flex-col bg-slate-100 rounded-lg shadow-lg overflow-hidden">      
            <Link to={`/task/${id}`} className="w-full px-1 pt-2 pb-1 flex flex-col">
                <div className="h-6 px-2 flex items-center gap-2 grow">
                    <span className="w-max flex flex-row items-center text-xs text-slate-400 font-bold capitalize">{category}</span>
                    <span className={`w-max flex flex-row items-center text-xs font-bold capitalize ${priority === "1" ? "text-green-500" : priority === "2" ? "text-yellow-500" : "text-orange-500"}`}>
                        {priority === "1" ? "Low" : priority === "2" ? "Normal" : "High"}
                    </span>
                </div>
                <div className="px-2 pb-2 grow flex flex-col">
                    <h3 className="h-8 mb-1 flex items-center text-lg font-semibold truncate">{title}</h3>
                    <div className='w-full h-16 mb-1'>
                        <p className="text-sm line-clamp-2 text-slate-700">{description}</p>
                    </div>
                    <span className='px-1 flex items-center gap-2 text-sm text-slate-500'><i className="fa-solid fa-calendar"></i>{day}</span>
                    {/* <span className='px-1 flex items-center gap-2 text-sm text-slate-500'><i className="fa-solid fa-bell"></i>{day}</span> */}
                </div>
            </Link>
            <div className='w-full px-2 pt-1 pb-2 flex items-center justify-between'>
                <button className={`w-8 h-8 flex items-center justify-center rounded-full duration-150 ${completed ? "bg-green-500 text-slate-100 hover:bg-green-600" : "bg-slate-200 hover:bg-slate-300"}`} onClick={completeTask}>
                    <i className='fa-solid fa-check'></i>
                </button>
                <div className='relative w-max h-8 flex items-center bg-slate-200 rounded-full'>
                    {menu && <>
                        <Link to={`/task/${id}`} className='ml-2 w-8 h-8 flex items-center justify-center'>
                            <i className="fa-solid fa-pen-to-square duration-150 hover:text-cyan-500"></i>
                        </Link>
                        <button className='w-8 h-8 flex items-center justify-center' onClick={deleteTask}>
                            <i className="fa-solid fa-trash duration-150 hover:text-red-500"></i>
                        </button>
                    </>}
                    <button className={`w-8 h-8 bg-slate-200 rounded-full hover:bg-slate-300 ${menu && "bg-slate-300"}`} onClick={handleMenu}>
                        {menu
                        ?   <i className="fa-solid fa-x"></i>
                        :   <i className="fa-solid fa-ellipsis"></i>}
                    </button>
                </div>
            </div>
        </li>
    )
}
