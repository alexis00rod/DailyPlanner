import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import { Header, Main } from '../components/index'
import { addTask } from '../service/firestore'
import { serverTimestamp } from 'firebase/firestore'
import { useEffect } from 'react'

const formatDate = (date) => {
    let year = date.getUTCFullYear()
    let month = ("0"+(date.getUTCMonth()+1)).slice(-2)
    let day = ("0" + date.getUTCDate()).slice(-2)

    return `${year}-${month}-${day}`
}

export const AddTasks = () => {
    const {userLogged} = useUserContext()
    const navigate = useNavigate()
    const [taskToAdd, setTaskToAdd] = useState({
        title: "",
        description: "",
        category: "personal",
        day: formatDate(new Date()),
        completed: false,
    })

    useEffect(() => {
        window.document.title = "Daily Planner | Nueva tarea"
    },[])

    const handleTask = ({target:{name,value}}) => {
        setTaskToAdd({
            ...taskToAdd,
            [name]:value
        })
    }

    const handleTaskDay = ({target:{value}}) => {
        setTaskToAdd({
            ...taskToAdd,
            day: formatDate(new Date(value))
        })
    }

    const sendTask = e => {
        e.preventDefault()
        addTask(userLogged,{
            ...taskToAdd,
            created: serverTimestamp()  
        })
        navigate('/')
    }

    return (
        <>
            <Header title="Nueva tarea" />
            <Main>
                <form className='section section-col' onSubmit={sendTask}>
                    {/* Titulo */}
                    <div className='px-1 py-1 flex flex-col gap-1'>
                        <label htmlFor="taskTitle" className="px-2 py-1 text-sm font-semibold cursor-pointer">Titulo</label>
                        <input type="text" name='title' id='taskTitle' className='input-text' onChange={handleTask} required/>
                    </div>
                    {/* Categoria */}
                    <div className='px-1 py-1 flex flex-col'>
                        <span className='px-2 py-1 text-sm font-semibold'>Categoria</span>
                        <div className='py-1 flex items-center gap-2'>
                            <div className='input-radio'>
                                <input type="radio" name="category" id="personal" className="input-radio" defaultValue={"personal"} onChange={handleTask} defaultChecked/>
                                <label htmlFor="personal" className="">Personal</label>
                            </div>
                            <div className='input-radio'>
                                <input type="radio" name="category" id="work" className="input-radio" defaultValue={"work"} onChange={handleTask} />
                                <label htmlFor="work" className="">Trabajo</label>
                            </div>
                            <div className='input-radio'>
                                <input type="radio" name="category" id="other" className="input-radio" defaultValue={"other"} onChange={handleTask}/>
                                <label htmlFor="other" className="">Otros</label>
                            </div>
                        </div>
                    </div>
                    {/* Dia */}
                    <div className='px-1 py-1 flex flex-col'>
                        <label htmlFor="taskDay" className="px-2 py-1 text-sm font-semibold cursor-pointer">Dia</label>
                        <input 
                        type="date" 
                        name="day" 
                        id='taskDay' 
                        className='input-text'
                        defaultValue={taskToAdd.day}
                        onChange={handleTaskDay} />
                    </div>
                    {/* Descripcion */}
                    <div className='px-1 py-1 flex flex-col'>
                        <label htmlFor="taskDescription" className="px-2 py-1 text-sm font-semibold cursor-pointer">Descripcion</label>
                        {/* <textarea name="description" id='taskDescription' className='h-20 px-3 py-2 bg-slate-100 border-2 border-slate-500 rounded-lg shadow-inner resize-none focus:outline-none focus:border-cyan-500 focus:shadow-lg' onChange={handleTask}></textarea> */}
                        <textarea name="description" id='taskDescription' className='textarea' onChange={handleTask}></textarea>
                    </div>
                    {/* Submit */}
                    <div className='mt-2 px-1 py-2 flex justify-center'>
                        <button type='submit' className='w-full max-w-xs h-10 mx-auto px-2 flex items-center justify-center text-slate-100 font-semibold bg-teal-500 rounded-lg duration-300 hover:bg-teal-600'>Crear tarea</button>
                        {/* <button type='submit' className='h-9 px-4 flex items-center rounded-full bg-slate-600 text-slate-100 font-semibold duration-150 hover:bg-slate-900'>Crear tarea</button> */}
                    </div>
                </form>
            </Main>
        </>
    )
}
