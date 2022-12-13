import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Main } from '../components/Main'
import { Message } from '../components/Message'
import { signup } from '../service/auth'
import { addUserToDb } from '../service/firestore'
import formImage from '../assets/form-image.png'
import { getDefaultProfilePhotoURL, uploadUserPhoto } from '../service/storage'

export const Signup = () => {
    const [signupStep, setSignupStep] = useState(1)
    const [signupUserPhoto, setSignupUserPhoto] = useState(false)

    const handleSignupUserPhoto = ({target:{files}}) => {
        setSignupUserPhoto(false)
        uploadUserPhoto(files[0],setSignupUserPhoto)
    }

    const handleSignupEmailPassword = e => {
        e.preventDefault()
        setSignupStep(2)
    }

    const handleSignupProfile = e => {
        e.preventDefault()
        setSignupStep(1)
    }

    useEffect(() => {
        getDefaultProfilePhotoURL(setSignupUserPhoto)
    },[])

    return (
        <Main full>
            <div className='section section-row'>
                <div className='hidden lg:flex lg:grow'>
                    <img src={formImage} alt="" className='w-full h-full object-cover'/>
                </div>
                {/* Signup */}
                <div className='w-full lg:w-1/3 py-4 flex flex-col gap-2 lg:flex-none'>
                    {/* Signup header */}
                    <div className='w-full px-1 py-2 flex flex-col'>
                        <h1 className='mb-1 px-1 pt-2 pb-4 text-5xl font-bold font-pacifico text-teal-500'>Daily Planner</h1>
                        <h2 className='px-2 pt-2 text-slate-500 text-xl'>Crear cuenta</h2>
                    </div>
                    {/* Signup body */}
                    <div className='w-full px-1 py-1 flex flex-col items-center gap-2'>
                        {/* Signup steps */}
                        <div className='w-full flex px-1 py-1'>
                            {/* Step 1 */}
                            <div className='grow px-1 py-1'>
                                <span className={`mb-1 w-10 h-10 flex items-center justify-center text-xl rounded-lg border-2 border-teal-300 ${signupStep === 1 ? "border-teal-300 text-slate-100 bg-teal-300" : "border-teal-300 text-teal-300"}`}>
                                    {signupStep === 1 ? "1" : <i className='fa-solid fa-check'></i>}
                                </span>
                                <span className='text-sm text-slate-500 text-center'>Email y contraseña</span>
                            </div>
                            <div className='grow px-1 py-1'>
                                <span className='w-10 h-10 flex items-center justify-center'>
                                    <i className='fa-solid fa-chevron-right text-xl text-slate-500'></i>
                                </span>
                            </div>
                            {/* Step 2 */}
                            <div className='grow px-1 py-1'>
                                <span className={`mb-1 w-10 h-10 flex items-center justify-center text-xl rounded-lg ${signupStep === 2 ? "bg-teal-300 text-slate-100" : "bg-slate-200 text-slate-500"}`}>2</span>
                                <span className='text-sm text-slate-500 text-center'>Perfil</span>
                            </div>
                        </div>
                        {/* Signup form */}
                        <form className='w-full flex flex-col gap-2'>
                            {/* Signup form steps navigation */}
                            <div className='w-full h-56'>
                                {signupStep === 1
                                // Step 1
                                ?   <>
                                        {/* Signup email */}
                                        <div className='w-full mb-1 px-1 py-1 flex flex-col'>
                                            <label htmlFor="email" className='px-1 font-medium'>Email</label>
                                            <input type="email" name="email" id='email'  className='input-text' />
                                        </div>
                                        {/* Signup password */}
                                        <div className='w-full mb-1 px-1 py-1 flex flex-col'>
                                            <label htmlFor="password1" className='px-1 font-medium'>Contraseña</label>
                                            <input type="password" name="password1"  className='input-text' />
                                        </div>
                                        {/* Signup confirm password */}
                                        <div className='w-full mb-1 px-1 py-1 flex flex-col'>
                                            <label htmlFor="password2" className='px-1 font-medium'>Confirmar contraseña</label>
                                            <input type="password" name="password2" className='input-text' />
                                        </div>
                                    </>
                                // Step 2
                                :   <>
                                        {/* Signup profile photo */}
                                        <div className='w-full mb-1 px-1 py-1 flex flex-col'>
                                            <span className='px-1 font-medium'>Foto de perfil</span>
                                                {signupUserPhoto 
                                                ?   <div className='w-full px-1 py-1 flex '>
                                                        <label htmlFor="photoURL" className='w-20 h-20 bg-teal-500 px-1 py-1 rounded-full overflow-hidden duration-300 cursor-pointer hover:bg-teal-600'>
                                                            <img src={signupUserPhoto} alt="" className='w-full h-full rounded-full object-cover' />
                                                        </label>
                                                        <input type="file" name='photoURL' id='photoURL' className='hidden' onChange={handleSignupUserPhoto} />
                                                    </div>
                                                :   <div className='w-full px-1 py-1 flex'>
                                                        <div className="w-20 h-20 inline-block text-teal-500 border-4 rounded-full spinner-border animate-spin "></div>
                                                    </div>}
                                        </div>
                                        {/* Signup name */}
                                        <div className='w-full mb-1 px-1 py-1 flex flex-col'>
                                            <label htmlFor="name" className='px-1 font-medium'>Nombre</label>
                                            <input type="text" name="name" id='name' placeholder='Nombre' className='input-text' />
                                        </div>
                                    </>}
                            </div>
                            {/* Signup button step */}
                            <div className='w-full px-1 py-1'>
                                {signupStep === 1
                                ?   <button className='w-full h-10 mx-auto px-2 flex items-center justify-center text-slate-100 font-semibold bg-teal-500 rounded-lg duration-300 hover:bg-teal-600' onClick={handleSignupEmailPassword}>Continuar</button>
                                :   <button className='w-full h-10 mx-auto px-2 flex items-center justify-center text-slate-100 font-semibold bg-teal-500 rounded-lg duration-300 hover:bg-teal-600' onClick={handleSignupProfile}>Finalizar</button>}
                            </div>
                        </form>
                    </div>
                    {/* Back login */}
                    <div className='px-2 h-16 flex items-center'>
                        <h4 className='px-1 py-2 w-max flex items-center gap-1'>¿Ya tienes una cuenta?<Link to='/login' className='w-max px-1 flex items-center text-teal-500 duration-300 hover:text-teal-600'>Iniciar sesion</Link></h4>
                    </div>
                </div>
            </div>
        </Main>
    )
}
