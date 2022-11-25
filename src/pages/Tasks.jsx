import { useState } from 'react'

export const Tasks = () => {
    const [todo, setTodo] = useState({})
    const [taskToSend, setTaskToSend] = useState([])

    const handleToDo = (e) => {
        setTodo({
            title: e.target.value
        })
    }

    const sendTask = (e) => {
        e.preventDefault()
        setTaskToSend([...taskToSend, todo])
    }

    const clearTasks = () => {
        setTaskToSend([])
    }

    return (
        <section className='flex flex-col gap-4'>
            <header className="mb-2 px-4 py-4 bg-violet-500 rounded-b-lg text-white">
                <h2 className="px-2 py-3 uppercase text-xl font-bold">Welcome user</h2>
            </header>
            <div className='mx-4 px-2 py-2 flex flex-col bg-white rounded-lg'>
                {/* Mostrar un slider con las fechas y obtener desde la base de datos las tareas de dicha fecha */}
                <p>Tasks</p>
            </div>
        </section>
        // <div className='mx-auto px-2 py-2 container flex flex-col gap-2'>
        //     <div className='px-2 py-2 flex flex-row items-center justify-center gap-2'>
        //         <form className='w-2/5 px-2 py-2 flex flex-row items-center gap-2' onSubmit={sendTask} onChange={handleToDo}>
        //             <input type="text" name="title" className='grow h-10 px-3 border-2 border-slate-400 rounded-md outline-none' placeholder='Task...' />
        //             <button className='w-max h-10 mx-2 px-4 bg-sky-600 text-white rounded duration-300 hover:bg-sky-700'>Add task</button>
        //         </form>
        //         {taskToSend.length > 0 && <button className='w-max h-10 mx-2 px-4 bg-red-500 text-white rounded duration-300 hover:bg-red-600' onClick={clearTasks}>Clear</button>}
        //     </div>
        //     <ul className='px-2 py-2 divide-y divide-slate-400'>
        //         {taskToSend.map((task,i) => (
        //             <li key={i} className="px-4 py-2 flex flex-row items-center gap-2">
        //                 <span className='w-8 h-8 flex flex-row items-center justify-center text-lg font-semibold'>{i+1}.</span>
        //                 <p className='grow text-lg'>
        //                     {task.title}
        //                 </p>
        //                 <div className='px-2 py-1 flex flex-row items-center gap-2'>
        //                     <button className='w-max h-10 px-4 bg-sky-500 text-white rounded duration-300 hover:bg-sky-600'>Edit</button>
        //                     <button className='w-max h-10 px-4 bg-red-500 text-white rounded duration-300 hover:bg-red-600'>Delete</button>
        //                 </div>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    )
}
