import { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Main } from '../components/index'
import { signup } from '../service/auth'
import { getDefaultProfilePhotoURL, uploadUserPhoto } from '../service/storage'
import formImage from '../assets/form-image.png'

export const Signup = () => {
    const navigate = useNavigate()
    const [signupStep, setSignupStep] = useState(1)
    const [signupErrorMessage, setSignupErrorMessage] = useState()
    const [userToSignup, setUserToSignup] = useState({})

    useEffect(() => {
        window.document.title = "Daily Planner | Crear cuenta"
    },[])

    // Expresiones regulares para validar formulario
    const regexp = {
        name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        password: /^.{4,12}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }

    // Funcion para validar email y password
    const validateEmailPassword = async e => {
        e.preventDefault()
        const {email,password,confirmpassword} = userToSignup

        // Valido email
        let emailTest = regexp.email.test(email)
        // Valido contraseña
        let passwordTest = regexp.password.test(password) && password === confirmpassword
        // Si email es invalido enviar error
        !emailTest && setSignupErrorMessage("Email invalido")
        // Si contraseña es invalida enviar error
        !passwordTest && setSignupErrorMessage("Contraseñas no coinciden")
        // Si ambos son validos pasar a paso 2
        emailTest && passwordTest && setSignupStep(2)
    }

    const handleInputs = ({target:{name,value}}) => {
        setUserToSignup({
            ...userToSignup,
            [name]:value
        })
    }

    const handleSignupUserPhoto = ({target:{files}}) => {
        const {email} = userToSignup

        setUserToSignup({...userToSignup,photoURL:false})

        uploadUserPhoto(files[0],email)
        .then(resp => setUserToSignup({...userToSignup,photoURL:resp}))
    }

    const signupProfile = async e => {
        e.preventDefault()
        const {email,password,displayName,photoURL} = userToSignup
        setSignupErrorMessage("")
        try {
            await signup(email,password,displayName,photoURL)
            navigate('/login')
        } catch (err) {
            setSignupErrorMessage(`${err.code.replace("auth/","")}`)
        }
    }

    useEffect(() => {
        getDefaultProfilePhotoURL()
        .then(resp => setUserToSignup({...userToSignup,photoURL:resp}))
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
                        <h2 className='px-2 pt-2 text-slate-600 text-xl dark:text-slate-400'>Crear cuenta</h2>
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
                                <span className='text-sm text-slate-600 text-center dark:text-slate-400'>Email y contraseña</span>
                            </div>
                            <div className='grow px-1 py-1'>
                                <span className='w-10 h-10 flex items-center justify-center'>
                                    <i className='fa-solid fa-chevron-right text-xl text-slate-400'></i>
                                </span>
                            </div>
                            {/* Step 2 */}
                            <div className='grow px-1 py-1'>
                                <span className={`mb-1 w-10 h-10 flex items-center justify-center text-xl rounded-lg ${signupStep === 2 ? "bg-teal-300 text-slate-100" : "bg-slate-200 text-slate-400"}`}>2</span>
                                <span className='text-sm text-slate-600 text-center dark:text-slate-400'>Perfil</span>
                            </div>
                        </div>
                        {/* Signup form */}
                        <form className='w-full flex flex-col gap-2'>
                            {/* Signup form steps navigation */}
                            <div className='w-full'>
                                {signupStep === 1
                                // Step 1
                                ?   <>
                                        {/* Signup error message */}
                                        {signupErrorMessage && 
                                        <div className='w-full mb-1 px-1 py-1'>
                                            <p className='px-2 py-2 text-red-500 font-semibold bg-red-200 border-2 border-red-500 rounded-lg'>Error: <span className='font-normal'>{signupErrorMessage}</span></p>
                                        </div>}
                                        {/* Signup email */}
                                        <div className='w-full mb-1 px-1 py-1 flex flex-col'>
                                            <label htmlFor="email" className='px-1 font-medium'>Email</label>
                                            <input type="email" name="email" id='email'  className='input-text' onChange={handleInputs} />
                                        </div>
                                        {/* Signup password */}
                                        <div className='w-full mb-1 px-1 py-1 flex flex-col'>
                                            <label htmlFor="password" className='px-1 font-medium'>Contraseña</label>
                                            <input type="password" name="password"  className='input-text' onChange={handleInputs}/>
                                        </div>
                                        {/* Signup confirm password */}
                                        <div className='w-full mb-1 px-1 py-1 flex flex-col'>
                                            <label htmlFor="confirmpassword" className='px-1 font-medium'>Confirmar contraseña</label>
                                            <input type="password" name="confirmpassword" className='input-text' onChange={handleInputs}/>
                                        </div>
                                    </>
                                // Step 2
                                :   <>
                                        {/* Signup profile photo */}
                                        <div className='w-full mb-1 px-1 py-1 flex flex-col'>
                                            <span className='px-1 font-medium'>Foto de perfil</span>
                                                {userToSignup.photoURL 
                                                ?   <div className='w-full px-1 py-1 flex '>
                                                        <label htmlFor="photoURL" className='w-20 h-20 bg-teal-500 px-1 py-1 rounded-full overflow-hidden duration-300 cursor-pointer hover:bg-teal-600'>
                                                            <img src={userToSignup.photoURL} alt="" className='w-full h-full rounded-full object-cover' />
                                                        </label>
                                                        <input type="file" name='photoURL' id='photoURL' className='hidden' onChange={handleSignupUserPhoto}/>
                                                    </div>
                                                :   <div className='w-full px-1 py-1 flex'>
                                                        <div className="w-20 h-20 inline-block text-teal-500 border-4 rounded-full spinner-border animate-spin "></div>
                                                    </div>}
                                        </div>
                                        {/* Signup name */}
                                        <div className='w-full mb-1 px-1 py-1 flex flex-col'>
                                            <label htmlFor="displayName" className='px-1 font-medium'>Nombre</label>
                                            <input type="text" name="displayName" id="displayName" placeholder="Nombre" className='input-text' onChange={handleInputs}/>
                                        </div>
                                    </>}
                            </div>
                            {/* Signup button step */}
                            <div className='w-full px-1 py-1'>
                                {signupStep === 1
                                // Funcion para registrar email y password
                                ?   <button className='w-full h-10 mx-auto px-2 flex items-center justify-center text-slate-100 font-semibold bg-teal-500 rounded-lg duration-300 hover:bg-teal-600' onClick={validateEmailPassword}>Continuar</button>
                                :   <button className='w-full h-10 mx-auto px-2 flex items-center justify-center text-slate-100 font-semibold bg-teal-500 rounded-lg duration-300 hover:bg-teal-600' onClick={signupProfile}>Finalizar</button>}
                            </div>
                        </form>
                        {/* Back to login */}
                        <div className='px-2 h-16 flex items-center'>
                            <h4 className='px-1 py-2 w-max flex items-center gap-1'>¿Ya tienes cuenta?<Link to='/login' className='w-max px-1 flex items-center text-teal-500 duration-300 hover:text-teal-600'>Iniciar sesion</Link></h4>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    )
}
