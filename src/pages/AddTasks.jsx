import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverTimestamp } from 'firebase/firestore'
import { addTask } from '../service/firestore'
import { useUserContext } from '../context/UserContext'
import { Header } from '../components/Header'
import { Main } from '../components/Main'

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
        priority: "1",
        day: formatDate(new Date()),
        completed: false,
    })

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
            <Header title="New task" />
            <Main>
                <form className='section' onSubmit={sendTask}>
                    {/* Task title */}
                    <div className='px-1 py-1 flex flex-col gap-1'>
                        <label htmlFor="taskTitle" className="px-2 py-1 text-sm font-semibold cursor-pointer">Task title</label>
                        <input type="text" name='title' id='taskTitle' className='h-10 px-3 bg-slate-100 border-2 border-slate-500 rounded-lg shadow-inner focus:outline-none focus:border-cyan-500 focus:shadow-lg' onChange={handleTask} required/>
                    </div>
                    {/* Category */}
                    <div className='px-1 py-1 flex flex-col'>
                        <span className='px-2 py-1 text-sm font-semibold'>Category</span>
                        <div className='py-1 flex items-center gap-2'>
                            <div className='input-radio'>
                                <input type="radio" name="category" id="personal" className="input-radio" defaultValue={"personal"} onChange={handleTask} defaultChecked/>
                                <label htmlFor="personal" className="">personal</label>
                            </div>
                            <div className='input-radio'>
                                <input type="radio" name="category" id="work" className="input-radio" defaultValue={"work"} onChange={handleTask} />
                                <label htmlFor="work" className="">work</label>
                            </div>
                            <div className='input-radio'>
                                <input type="radio" name="category" id="other" className="input-radio" defaultValue={"other"} onChange={handleTask}/>
                                <label htmlFor="other" className="">other</label>
                            </div>
                        </div>
                    </div>
                    {/* Priority */}
                    <div className='px-1 py-1 flex flex-col'>
                        <span className='px-2 py-1 text-sm font-semibold'>Priority</span>
                        <div className='py-1 flex items-center gap-2'>
                            <div className='input-radio'>
                                <input type="radio" name="priority" id="low" className="input-radio" defaultValue={1} onChange={handleTask} defaultChecked/>
                                <label htmlFor="low" className="">low</label>
                            </div>
                            <div className='input-radio'>
                                <input type="radio" name="priority" id="medium" className="input-radio" defaultValue={2} onChange={handleTask}/>
                                <label htmlFor="medium" className="">medium</label>
                            </div>
                            <div className='input-radio'>
                                <input type="radio" name="priority" id="high" className="input-radio" defaultValue={3} onChange={handleTask}/>
                                <label htmlFor="high" className="">high</label>
                            </div>
                        </div>
                    </div>
                    {/* Day */}
                    <div className='px-1 py-1 flex flex-col'>
                        <label htmlFor="taskDay" className="px-2 py-1 text-sm font-semibold cursor-pointer">Day</label>
                        <input 
                        type="date" 
                        name="day" 
                        id='taskDay' 
                        className='h-10 px-3 bg-slate-100 border-2 border-slate-500 rounded-lg shadow-inner focus:outline-none focus:border-cyan-500 focus:shadow-lg'
                        defaultValue={taskToAdd.day}
                        onChange={handleTaskDay} />
                    </div>
                    {/* Description */}
                    <div className='px-1 py-1 flex flex-col'>
                        <label htmlFor="taskDescription" className="px-2 py-1 text-sm font-semibold cursor-pointer">Description</label>
                        <textarea name="description" id='taskDescription' className='h-20 px-3 py-2 bg-slate-100 border-2 border-slate-500 rounded-lg shadow-inner resize-none focus:outline-none focus:border-cyan-500 focus:shadow-lg' onChange={handleTask}></textarea>
                    </div>
                    {/* Submit */}
                    <div className='mt-2 px-1 py-2 flex justify-center'>
                        <button type='submit' className='h-9 px-4 flex items-center rounded-full bg-slate-600 text-slate-100 font-semibold duration-150 hover:bg-slate-900'>Create</button>
                    </div>
                </form>
            </Main>
        </>
    )
}
