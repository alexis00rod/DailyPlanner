import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Main } from '../components/Main'
import { login } from '../service/auth'
import formImage from '../assets/form-image.png'

export const Login = () => {
    const [userToLogin, setUserToLogin] = useState()
    const [loginErrorMessage, setLoginErrorMessage] = useState()
    const navigate = useNavigate()

    const handleUserToLogin = ({target: {name,value}}) => {
        setUserToLogin({...userToLogin,[name]:value})
    }

    const loginUser = async e => {
        e.preventDefault()
        setLoginErrorMessage("")
        try {
            await login(userToLogin)
            navigate('/')
        } catch (err) {
            setLoginErrorMessage(`${err.code.replace("auth/","")}`)
        }
    }

    return (
        <Main full>
            <div className='section section-row'>
                <div className='hidden lg:flex lg:grow'>
                    <img src={formImage} alt="" className='w-full h-full object-cover'/>
                </div>
                {/* Login */}
                <div className='w-full lg:w-1/3 py-4 flex flex-col gap-2 lg:flex-none'>
                    {/* Login header */}
                    <div className='w-full px-1 py-2 flex flex-col'>
                        <h1 className='mb-1 px-1 pt-2 pb-4 text-5xl font-bold font-pacifico text-teal-500'>Daily Planner</h1>
                        <h2 className='px-2 pt-2 text-slate-600 dark:text-slate-400 text-xl'>Iniciar sesion</h2>
                    </div>
                    {/* Login body */}
                    <div className='w-full px-1 py-1 flex flex-col gap-2' onSubmit={loginUser}>
                        {/* Login form */}
                        <form className='w-full flex flex-col gap-2'>
                            {/* Signup error message */}
                            {loginErrorMessage && 
                            <div className='w-full mb-1 px-1 py-1'>
                                <p className='px-2 py-2 text-red-500 font-semibold bg-red-200 border-2 border-red-500 rounded-lg'>Error: <span className='font-normal'>{loginErrorMessage}</span></p>
                            </div>}
                            {/* Login email */}
                            <div className='w-full mb-1 px-1 py-1 flex flex-col'>
                                <label htmlFor="email" className="px-1 font-medium">Email</label>
                                <input type="text" name='email' id='email' className='input-text' onChange={handleUserToLogin} required/>
                            </div>
                            {/* Login password */}
                            <div className='w-full mb-1 px-1 py-1 flex flex-col'>
                                <label htmlFor="password" className="px-1 font-medium">Password</label>
                                <input type="password" name='password' id='password' className='input-text' onChange={handleUserToLogin} required/>
                            </div>
                            {/* Login forgot password */}
                            <div className='w-full mb-1 px-1 py-1 flex flex-col'>
                                <span className='w-max px-1 flex items-center text-teal-500 duration-300 hover:text-teal-600 cursor-pointer'>¿Olvidaste tu contraseña?</span>
                            </div>
                            {/* Submit */}
                            <div className='w-full px-1 py-1'>
                                <button type='submit' className='w-full h-10 mx-auto px-2 flex items-center justify-center text-slate-100 font-semibold bg-teal-500 rounded-lg duration-300 hover:bg-teal-600'>Login</button>
                            </div>
                        </form>
                        {/* Go to signup */}
                        <div className='px-2 h-16 flex items-center'>
                            <h4 className='px-1 py-2 w-max flex items-center gap-1'>¿No tienes cuenta?<Link to='/signup' className='w-max px-1 flex items-center text-teal-500 duration-300 hover:text-teal-600'>Crear cuenta</Link></h4>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    )
}
