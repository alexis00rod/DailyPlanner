import { app } from './key'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const storage = getStorage(app)
const defaultProfilePhoto = ref(storage,'default-pic-profile.png')
const usersPhoto = (user) => ref(storage,`users-photo/${user}`)

// Funcion para obtener URL de foto de perfil por defecto
export const getDefaultProfilePhotoURL = (set) => {
    return getDownloadURL(defaultProfilePhoto)
}

// Funcion para subir photo a la base de datos
export const uploadUserPhoto = async (file,user) => {
    const upload = await uploadBytes(usersPhoto(user), file)
    const url = await getDownloadURL(usersPhoto(user))
    return url
}
