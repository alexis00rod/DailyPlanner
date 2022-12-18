import { Link } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import { completeTaskDb, deleteTaskDb } from '../service/firestore'

export const TaskItem = ({item:{id,title,description,day,category,priority,completed}}) => {
    const { userLogged } = useUserContext()

    const completeTask = () => {
        completeTaskDb(userLogged,id,completed)
    }

    const deleteTask = () => {
        deleteTaskDb(userLogged,id)
    }

    return (
        <li className="card">      
            <Link to={`/task/${id}`} className="card-body">
                {/* <div className="h-6 px-2 flex items-center gap-2 grow">
                    <span className="w-max flex flex-row items-center text-xs text-slate-400 font-bold capitalize">{category}</span>
                    <span className={`w-max flex flex-row items-center text-xs font-bold capitalize ${priority === "1" ? "text-green-500" : priority === "2" ? "text-yellow-500" : "text-orange-500"}`}>
                        {priority === "1" ? "Low" : priority === "2" ? "Normal" : "High"}
                    </span>
                </div> */}
                <div className="px-2 pb-2 grow flex flex-col">
                    <h3 className="h-8 mb-1 flex items-center text-lg font-semibold truncate">{title}</h3>
                    <div className='w-full h-16 mb-1'>
                        <p className="text-sm line-clamp-2 text-slate-700 dark:text-slate-300">{description}</p>
                    </div>
                    <div className='w-full flex gap-2'>
                        <span className='w-max px-1 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400'><i className="fa-solid fa-calendar"></i>{day}</span>
                        <span className='w-max px-1 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400'><i className="fa-solid fa-bell"></i>{day}</span>
                    </div>
                </div>
            </Link>
            <div className='card-cta'>
                <button className={`btn btn-toggle ${completed ? 'btn-finish-active':'btn-finish'}`} onClick={completeTask}><i className='fa-solid fa-check'></i></button>
                <button className='btn btn-toggle btn-delete' onClick={deleteTask}><i className='fa-solid fa-trash'></i></button>    
            </div>
        </li>
    )
}
