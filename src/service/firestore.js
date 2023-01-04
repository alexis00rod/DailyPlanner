import { app } from './key'
import { getFirestore, collection,addDoc, doc, getDocs, onSnapshot, deleteDoc, updateDoc, query,where, getDoc, orderBy, setDoc } from 'firebase/firestore'

const db = getFirestore(app)

// Referencias
const userRef = (user) => doc(db,"users",user)
const tasksUserRef = (user) => collection(db,"users",user,"tasks")
const taskRef = (user,id) => doc(db,"users",user,"tasks",id)
const allTasksRef = (user) => query(tasksUserRef(user),orderBy("day","asc"),orderBy("hour","asc"))
const categoryTasksRef = (user,category) => query(tasksUserRef(user),where("category","==",category),orderBy("day","asc"),orderBy("hour","asc"))
const dayTasksRef = (user,day) => query(tasksUserRef(user),where("day","==",day),orderBy("hour","asc"))

// Funcion para agregar usuario a la base de datos
export const addUserToDb = (user) => {
  const {email} = user
  setDoc(userRef(email), user)
}

// Funcion para agregar tarea a la base de datos
export const addTask = (user,task) => {
  const { email } = user
  addDoc(tasksUserRef(email),task)
}

// Funcion para obtener todas las tareas
export const getAllTasks = (user,set) => {
  const {email} = user
  onSnapshot(allTasksRef(email),snapshot => {
    set(snapshot.docs.map(e => ({
      id: e.id,
      ...e.data()
    })))
  })
}

// Funcion para obtener tareas filtradas por categoria
export const getCategoryTasks = (user,category,set) => {
  const {email} = user
  onSnapshot(categoryTasksRef(email,category),snapshot => {
    set(snapshot.docs.map(e => ({
      id: e.id,
      ...e.data()
    })))
  })
}

// Funcion para obtener las tareas por dia
export const getDayTasks = (user,day,set) => {
  const {email} = user

  onSnapshot(dayTasksRef(email,day),snapshot => {
    set(snapshot.docs.map(e => ({id: e.id, ...e.data()})))
  })
}

export const getTasksCount = ({email},set) => {
  onSnapshot(tasksUserRef(email), snapshot => {
    set(snapshot.docs.map(e => ({id: e.id, ...e.data()})))
  })
}

// Funcion para eliminar tarea
export const deleteTaskDb = (user,task) => {
  const { email } = user
  deleteDoc(taskRef(email,task))
}

// Funcion para finalizar tarea
export const completeTaskDb = (user,task,completed) => { 
  const { email } = user
  completed 
  ? updateDoc(taskRef(email,task),{ completed: false })
  : updateDoc(taskRef(email,task),{ completed: true })
}

// Funcion para obtener el detalles de la tarea
export const viewTask = async ({email},id) => {
  const taskSnap = await getDoc(taskRef(email,id))
  return taskSnap
} 
 
// Funcion para editar nota
export const editTask = async (user,task) => {
  const {id,title,description} = task
  const {email} = user
  await updateDoc(taskRef(email,id),{title, description})
}

