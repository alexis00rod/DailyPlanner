import { useState, useEffect } from 'react'
import { useUserContext } from '../context/UserContext'
import { getAllTasks, getCategoryTasks } from '../service/firestore'

export const useTasks = () => {
    const {userLogged} = useUserContext()
    const [allTasks, setAllTasks] = useState([])
    const [workTasks, setWorkTasks] = useState([])
    const [personalTasks, setPersonalTasks] = useState([])
    const [otherTasks, setOtherTasks] = useState([])
    
    useEffect(() => {
        getAllTasks(userLogged,"day","asc",setAllTasks)
        getCategoryTasks(userLogged,"work","day","asc",setWorkTasks)
        getCategoryTasks(userLogged,"personal","day","asc",setPersonalTasks)
        getCategoryTasks(userLogged,"other","day","asc",setOtherTasks)
    },[])

    return { allTasks, workTasks, personalTasks, otherTasks }
}
