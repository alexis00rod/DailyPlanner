import { app } from './key'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence,browserLocalPersistence, updateProfile } from 'firebase/auth'

export const auth = getAuth(app)

// Funcion para crear usuario usando email y contraseña
export const signup = (email,password,displayName,photoURL) => {
  createUserWithEmailAndPassword(auth,email,password)
  .then(credential => {
    updateProfile(auth.currentUser, {displayName, photoURL})
  })
}

// Funcion para iniciar sesion usando email y contraseña
export const login = ({email,password}) => signInWithEmailAndPassword(auth,email,password)

// Funcion para detectar el estado de la autenticacion
export const stateAuth = (set) => {
    const unsubuscribe = onAuthStateChanged(auth, currentUser => {set(currentUser)})
    return () => unsubuscribe()
}

// Funcion para cerrar sesion
export const logout = () => signOut(auth)