import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import { editTask, viewTask } from "../service/firestore"
import { Header } from "../components/Header"
import { Loader } from "../components/Loader"
import { Main } from "../components/Main"

export const TaskView = () => {
    const {userLogged} = useUserContext()
    const {id} = useParams()
    const [task, setTask] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        viewTask(userLogged,id)
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

    if(!loading) return <Loader />

    return <>
            <Header />
            <Main>
                <form className="section" onChange={handleEditTask} onSubmit={sendEditTask}>
                    {/* Task title */}
                    <input type="text" name="title" className="w-full mb-1 px-1 py-1 text-3xl bg-transparent outline-none" defaultValue={task.title} placeholder="Title..." />
                    {/* Task description */}
                    <textarea name="description" className="w-full px-1 py-1 grow bg-transparent outline-none" defaultValue={task.description} placeholder="Description..."></textarea>
                    {/* Task update */}
                    <button type="submit" className="w-10 h-10 flex items-center justify-center bg-slate-200 rounded-full"><i className="fa-solid fa-check"></i></button>
                </form>
            </Main>
        </>
}
