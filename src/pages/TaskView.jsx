import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import { editTask, viewTask } from "../service/firestore"
import { Header,Loader,Main } from '../components/index'

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

    useEffect(() => {
        window.document.title = `Daily Planner | ${task.title}`

    },[task])
    
    
    const handleEditTask = ({target:{name,value}}) => {
        setTask({
            ...task,
            [name]:value
        })
    }

    const sendEditTask = (e) => {
        e.preventDefault()
        editTask(userLogged,task)
    }

    console.log('task', task)

    if(!loading) return <Loader />

    return <>
            <Header />
            <Main>
                <form className="section section-col" onChange={handleEditTask} onSubmit={sendEditTask}>
                    {/* Titulo */}
                    <input type="text" name="title" className="w-full mb-1 px-1 py-1 text-3xl bg-transparent outline-none" defaultValue={task.title} placeholder="Titulo..." />
                    {/* Descripcion */}
                    <textarea name="description" className="w-full px-1 py-1 grow bg-transparent outline-none" defaultValue={task.description} placeholder="Descripcion..."></textarea>
                    {/* Boton actualizar tarea */}
                    <button type="submit" className="w-10 h-10 flex items-center justify-center bg-slate-200 rounded-full"><i className="fa-solid fa-check"></i></button>
                </form>
            </Main>
        </>
}
