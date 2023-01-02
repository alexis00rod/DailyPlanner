import { useState, useEffect } from 'react'
import { useUserContext } from '../context/UserContext'
import { getAllTasks, getCategoryTasks } from '../service/firestore'

export const useTasks = () => {
    const {userLogged} = useUserContext()
    const [allTasks, setAllTasks] = useState([])
    const [workTasks, setWorkTasks] = useState([])
    const [personalTasks, setPersonalTasks] = useState([])
    const [otherTasks, setOtherTasks] = useState([])
    const [shoppingTasks, setShoppingTasks] = useState([])
    const [studyTasks, setStudyTasks] = useState([])
    const [houseTasks, setHouseTasks] = useState([])
    
    useEffect(() => {
        getAllTasks(userLogged,"day","asc",setAllTasks)
        getCategoryTasks(userLogged,"work","day","asc",setWorkTasks)
        getCategoryTasks(userLogged,"personal","day","asc",setPersonalTasks)
        getCategoryTasks(userLogged,"shopping","day","asc",setShoppingTasks)
        getCategoryTasks(userLogged,"study","day","asc",setStudyTasks)
        getCategoryTasks(userLogged,"house","day","asc",setHouseTasks)
        getCategoryTasks(userLogged,"other","day","asc",setOtherTasks)
    },[])

    return { allTasks, workTasks, personalTasks, otherTasks, shoppingTasks, studyTasks, houseTasks }
}
