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
        getAllTasks(userLogged,"created","desc",setAllTasks)
        getCategoryTasks(userLogged,"work","created","desc",setWorkTasks)
        getCategoryTasks(userLogged,"personal","created","desc",setPersonalTasks)
        getCategoryTasks(userLogged,"other","created","desc",setOtherTasks)
    },[])

    return { allTasks, workTasks, personalTasks, otherTasks }
}
