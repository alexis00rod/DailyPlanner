import { useState, useEffect } from 'react'
import { useUserContext } from '../context/UserContext'
import { getTasksDb } from '../service/firestore'

export const useTasks = () => {
    const {user} = useUserContext()
    const [tasks, setTasks] = useState([])

    const [orderBy, setOrderBy] = useState("dateStart")
    const [order, setOrder] = useState("desc")

    const [tasksPerDay, setTasksPerDay] = useState([])
    const [tasksDone, setTasksDone] = useState([])
    const [tasksUpcoming, setTasksUpcoming] = useState([])

    

    useEffect(() => {
        // getTasksDb(user,orderBy,order,setTasks)
        // // .then(resp => console.log(resp))
    },[])

    return {
        tasks,

    }
}