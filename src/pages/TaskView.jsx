import { useEffect, useState } from "react"
import { useUserContext } from "../context/UserContext"
import { useParams } from "react-router-dom"
import { Header } from "../components/Header"
import { Loader } from "../components/Loader"
import { editTask, viewTask } from "../service/firestore"

export const TaskView = () => {
    const {user} = useUserContext()
    const {id} = useParams()
    const [task, setTask] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        viewTask(user,id)
        .then(resp => setTask({id:resp.id,...resp.data()}))
        .finally(() => setLoading(true))

    },[id])

    const handleEditTask = ({target:{name,value}}) => {
        setTask({
            ...task,
            [name]:value
        })
    }

    const sendEditTask = (e) => {
        e.preventDefault()
        editTask(task)
    }

    return (
        <section className='flex flex-col grow overflow-y-scroll'>
            <Header />
            <main className='w-full px-2 py-2 flex flex-col grow'>
                {loading
                ?   <div className='container mx-auto grow bg-slate-100 rounded-lg shadow-lg'>
                        <form className="w-full h-full px-3 py-3 flex flex-col items-end gap-2" onChange={handleEditTask} onSubmit={sendEditTask}>
                            <input type="text" name="title" className="w-full mb-1 px-1 py-1 text-3xl bg-transparent outline-none" defaultValue={task.title} placeholder="Title..." />
                            <textarea name="description" className="w-full px-1 py-1 grow bg-transparent outline-none" defaultValue={task.description} placeholder="Description..."></textarea>
                            <button type="submit" className="w-10 h-10 flex items-center justify-center bg-slate-200 rounded-full"><i className="fa-solid fa-check"></i></button>
                        </form>
                    </div>
                :   <Loader />}
            </main>
        </section>
    )
}
