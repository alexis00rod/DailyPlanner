import { NavLink, useParams } from "react-router-dom"
import { Header, Main, TaskList } from "../components"

const FilterNavlink = ({children,...props}) => {
    return <NavLink {...props} 
                className={({isActive}) => `filter ${isActive ? "filter-act" : "filter-dis"} `}>
                    {children}
            </NavLink>
}

export const TaskCategory = () => {
    const {category,filter} = useParams()

    return <>
        <Header 
            title="Tareas" />
        <Main>
            <div className="px-1 py-1 w-full flex flex-wrap items-center gap-2">
                {[["today","Hoy"],["pending","Pendiente"],["finish","Finalizado"],["all","Todo"]].map(e => (
                    <FilterNavlink to={`/tasks/${category}/${e[0]}`}>{e[1]}</FilterNavlink>    
                ))}
            </div>
            <TaskList category={category} filter={filter} />
        </Main>
    </>
}
