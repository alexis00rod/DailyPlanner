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
    hour: "",
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

  return <>
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
          <div className='py-1 flex items-center flex-wrap gap-2'>
            {[["personal","Personal"],["work","Trabajo"],["study","Estudio"],["shopping","Compras"],["house","Casa"],["other","Otro"]].map((e,i) => (
              <div className='input-radio' key={e[0]}>
                {i === 0
                ? <input type="radio" name="category" id={e[0]} className="input-radio" defaultValue={e[0]} onChange={handleTask} defaultChecked/>
                : <input type="radio" name="category" id={e[0]} className="input-radio" defaultValue={e[0]} onChange={handleTask}/>}
                <label htmlFor={e[0]} className="">{e[1]}</label>
              </div>
            ))}
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
          onChange={handleTaskDay} required/>
        </div>
        {/* Hora */}
        <div className='px-1 py-1 flex flex-col'>
          <label htmlFor="taskHour" className='px-2 py-1 text-sm font-semibold cursor-pointer'>Hora</label>
          <input 
          type="time"
          name="hour"
          id="taskHour"
          className='input-text'
          defaultValue={taskToAdd.hour}
          onChange={handleTask} required/>
        </div>
        {/* Descripcion */}
        <div className='px-1 py-1 flex flex-col'>
          <label htmlFor="taskDescription" className="px-2 py-1 text-sm font-semibold cursor-pointer">Descripcion</label>
          <textarea name="description" id='taskDescription' className='textarea' onChange={handleTask}></textarea>
        </div>
        {/* Submit */}
        <div className='mt-2 px-1 py-2 flex justify-center'>
          <button type='submit' className='btn btn-form'>Crear tarea</button>
        </div>
      </form>
    </Main>
  </>
}
