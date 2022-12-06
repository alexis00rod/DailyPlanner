import { app } from './key'
import { getFirestore, collection,addDoc, doc, getDocs, onSnapshot, deleteDoc, updateDoc, query,where, getDoc, orderBy } from 'firebase/firestore'

const db = getFirestore(app)

// References
const userRef = (user => doc(db,"users",user))
const tasksUserRef = (user) => collection(db,"users",user,"tasks")

const taskRef = (user,id) => doc(db,"users",user,"tasks",id)

// Funcion para obtener usuario
export const getUser = async (user = "alexis00rodrigo@gmail.com") => {
    return await getDoc(userRef(user))
}

// Funcion para agregar tarea a la base de datos
export const addTask = async (task) => {
    await addDoc(tasksUserRef("alexis00rodrigo@gmail.com"),task)
}

// Funcion para obtener las tareas desde la base de datos
export const getTasksDb = (user,by,order,set,status) => {
    const {email} = user
    const col = collection(db,"users",email,"tasks")
    const ref = status === undefined 
        ?   query(col,where("completed","==",false),orderBy(by,order)) 
        :   status === "completed"
            ?    query(col,where("completed","==",true),orderBy(by,order)) 
            :   query(col,orderBy(by,order)) 

    onSnapshot(ref,snapshot => {
        set(snapshot.docs.map(e => ({
            id: e.id,
            ...e.data()
        })))
    })
}

export const getTasksCount = ({email},set) => {
    const ref = collection(db,"users",email,"tasks")
    onSnapshot(ref, snapshot => {
        set(snapshot.docs.map(e => ({id: e.id,...e.data()})))
    })
}

// Funcion para obtener las tareas por dia
export const getDayTasks = (user,day,set) => {
    const {email} = user
    const col = collection(db,"users",email,"tasks")
    const ref = query(col,where("day","==",day),orderBy("created","desc"))

    onSnapshot(ref,snapshot => {
        set(snapshot.docs.map(e => ({
            id: e.id,
            ...e.data()
        })))
    })
}

// Funcion para eliminar tarea
export const deleteTaskDb = (user,task) => {
    const { email } = user
    deleteDoc(doc(db,"users",email,"tasks",task))
}

// Funcion para finalizar tarea
export const completeTaskDb = (user,task,completed) => { 
    const { email } = user
    completed 
    ?   updateDoc(taskRef(email,task),{
            completed: false
        })
    :   updateDoc(taskRef(email,task),{
            completed: true
        })
}

// Funcion para obtener el detalles de la tarea
export const viewTask = async ({email},id) => {
    const taskSnap = await getDoc(taskRef(email,id))
    return taskSnap
} 
 
// Funcion para editar nota
export const editTask = async ({id,title,description}) => {
    await updateDoc(taskRef("alexis00rodrigo@gmail.com",id),{
        title: title,
        description: description
    })
}

