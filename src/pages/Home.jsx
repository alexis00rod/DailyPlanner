import { useEffect } from 'react'
import { useUserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'
import { useTasks } from '../hook/useTasks'
import { Header, Main } from '../components/index'

export const Home = () => {
    const { userLogged } = useUserContext()
    const { allTasks, workTasks, personalTasks, houseTasks, studyTasks, shoppingTasks, otherTasks } = useTasks()

    const items = [
        ["all","clipboard","Todas las tareas",allTasks],
        ["work","briefcase","Trabajo",workTasks],
        ["personal","user","Personal",personalTasks],
        ["house","house","Casa",houseTasks],
        ["study","pen-nib","Estudio",studyTasks],
        ["shopping","cart-shopping","Compras",shoppingTasks],
        ["other","question","Otros",otherTasks]
    ]

    useEffect(() => {
        window.document.title = "Daily Planner"
    },[])

    return <>
            <Header title={`Hola! ${userLogged.displayName}`} />
            <Main>
                <div className='w-full px-1 py-1 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                    {items.map(item => (
                        <Link to={`/tasks/${item[0]}/today`} key={item[0]} className='py-4 flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-lg'>
                            <i className={`fa-solid fa-${item[1]} w-9 h-9 mb-2 flex items-center justify-center bg-teal-500/10 text-teal-500 rounded-full`}></i>
                            <span className='mb-1 text-teal-500 font-medium'>{item[2]}</span>
                            <span className='flex items-center text-sm text-zinc-500'>{item[3].length} items</span>
                        </Link>
                    ))}
                </div>
            </Main>
        </>
}
