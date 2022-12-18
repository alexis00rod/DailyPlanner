import { useEffect } from 'react'
import { useState } from 'react'
import { useTasks } from '../hook/useTasks'
import { TaskItem } from './TaskItem'

const convertDateToString = (value) => {
    let year = value.getUTCFullYear()
    let month = ("0"+(value.getUTCMonth()+1)).slice(-2)
    let day = ("0" + value.getUTCDate()).slice(-2)

    return `${year}-${month}-${day}`
}

export const TaskList = ({category,filter}) => {
    const {allTasks,workTasks,personalTasks,otherTasks} = useTasks()

    const tasksList = (tasks,filter) => {
        const list = filter === "today" 
                        ?   tasks.filter(e => e.day === convertDateToString(new Date))
                        :   filter === "pending"
                            ?   tasks.filter(e => e.completed === false)
                            :   tasks.filter(e => e.completed === true)

        return list.map(item => <TaskItem key={item.id} item={item} />)
    }

    return <ul className='px-1 py-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {!category && tasksList(allTasks,filter)}
                {category === "work" && tasksList(workTasks,filter)}
                {category === "personal" && tasksList(personalTasks,filter)}
                {category === "other" && tasksList(otherTasks,filter)}
            </ul>
}
