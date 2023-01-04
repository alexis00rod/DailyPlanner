import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import { Header,Loader,Main } from '../components/index'
import { editTask, viewTask } from "../service/firestore"

export const TaskView = () => {
  const {userLogged} = useUserContext()
  const {id} = useParams()
  const [task, setTask] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
    navigate(-1)
  }

  if(!loading) return <Loader />

  return <>
    <Header title="Tarea"/>
    <Main>
      <form className="section section-col" onChange={handleEditTask} onSubmit={sendEditTask}>
        {/* Titulo */}
        <input type="text" name="title" className="w-full mb-1 px-1 py-1 text-3xl bg-transparent outline-none" defaultValue={task.title} placeholder="Titulo..." />
        {/* Descripcion */}
        <textarea name="description" className="w-full px-1 py-1 grow bg-transparent outline-none" defaultValue={task.description} placeholder="Descripcion..."></textarea>
        {/* Boton actualizar tarea */}
        <button type="submit" className="btn btn-update"><i className="fa-solid fa-check"></i></button>
      </form>
    </Main>
  </>
}
