import { app } from './key'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const storage = getStorage(app)
const usersPhoto = (user) => ref(storage,`users-photo/${user}`)
const defaultProfilePhoto = ref(storage,'default-pic-profile.png')

// Funcion para obtener URL de foto de perfil por defecto
export const getDefaultProfilePhotoURL = (set) => {
    getDownloadURL(defaultProfilePhoto)
    .then(resp => set(resp))
}

// Funcion para subir photo a la base de datos
export const uploadUserPhoto = (file,set) => {
    uploadBytes(usersPhoto("alexis@email.com"), file)
    .then(() => getDownloadURL(usersPhoto("alexis@email.com")).then(resp => set(resp)))
}
