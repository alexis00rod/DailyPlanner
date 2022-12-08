import { app } from './key'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence,browserLocalPersistence } from 'firebase/auth'

const auth = getAuth(app)

// Funcion para crear usuario usando email y contraseña
export const signup = ({email,password}) => {
    return createUserWithEmailAndPassword(auth,email,password)
}

// Funcion para iniciar sesion usando email y contraseña
export const login = ({email,password}) => {
    return signInWithEmailAndPassword(auth,email,password)
}

// Funcion para detectar el estado de la autenticacion
export const stateAuth = (set) => {
    const unsubuscribe = onAuthStateChanged(auth, currentUser => {set(currentUser)})
    return () => unsubuscribe()
}

// Funcion para cerrar sesion
export const logout = () => {
    signOut(auth)
}