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
        getAllTasks(userLogged,setAllTasks)
        getCategoryTasks(userLogged,"work",setWorkTasks)
        getCategoryTasks(userLogged,"personal",setPersonalTasks)
        getCategoryTasks(userLogged,"shopping",setShoppingTasks)
        getCategoryTasks(userLogged,"study",setStudyTasks)
        getCategoryTasks(userLogged,"house",setHouseTasks)
        getCategoryTasks(userLogged,"other",setOtherTasks)
    },[])

    return { allTasks, workTasks, personalTasks, otherTasks, shoppingTasks, studyTasks, houseTasks }
}
