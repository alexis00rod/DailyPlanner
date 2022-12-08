import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Message } from '../components/Message'
import { login } from '../service/auth'

export const Login = () => {
    const [userToLogin, setUserToLogin] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const navigate = useNavigate()

    const handleUserToLogin = ({target: {name,value}}) => {
        setUserToLogin({...userToLogin,[name]:value})
    }

    const loginUser = async e => {
        e.preventDefault()
        setErrorMessage("")
        try {
            await login(userToLogin)
            navigate('/')
        } catch (err) {
            setErrorMessage(err.code)
        }
    }

    return (
        <div className="w-full h-screen bg-slate-200">
            <div className="container h-full mx-auto px-2 py-2 flex flex-col justify-center items-center">
                <div className='w-full max-w-screen-sm mx-auto px-2 py-2 bg-slate-100 flex flex-col items-center rounded-lg shadow-lg'>
                    <div className='w-full px-2 py-2 flex flex-col items-center'>
                        <h2 className='w-max mb-2 px-1 py-2 text-4xl font-bold'>Login</h2>
                        <p className="w-max px-1 py-1 flex items-center gap-2">You are not a user?<Link to='/signup' className="text-slate-700 font-semibold duration-150 hover:text-slate-900">Signup</Link></p>
                    </div>
                    <form className='w-full mx-auto px-2 py-2 flex flex-col justify-evenly md:justify-start md:gap-2' onSubmit={loginUser}>
                        {errorMessage && <Message color="red" message={errorMessage} />}
                        {/* User email */}
                        <div className='px-1 py-1 flex flex-col gap-1'>
                            <label htmlFor="email" className="px-2 py-1 text-sm font-semibold cursor-pointer">Email</label>
                            <input type="text" name='email' id='email' className='h-10 px-3 bg-slate-100 border-2 border-slate-500 rounded-lg shadow-inner focus:outline-none focus:border-cyan-500 focus:shadow-lg' onChange={handleUserToLogin} required/>
                        </div>
                        {/* User password */}
                        <div className='px-1 py-1 flex flex-col gap-1'>
                            <label htmlFor="password" className="px-2 py-1 text-sm font-semibold cursor-pointer">Password</label>
                            <input type="password" name='password' id='password' className='h-10 px-3 bg-slate-100 border-2 border-slate-500 rounded-lg shadow-inner focus:outline-none focus:border-cyan-500 focus:shadow-lg' onChange={handleUserToLogin} required/>
                        </div>
                        <div className='px-1 py-1'>
                            <span className='px-1 text-slate-600 font-medium cursor-pointer duration-150 hover:text-slate-900'>Forgot password?</span>
                        </div>
                        {/* Submit */}
                        <div className='px-1 py-2'>
                            <button type='submit' className='w-max h-9 mx-auto px-4 flex items-center rounded-full bg-slate-600 text-slate-100 font-semibold duration-150 hover:bg-slate-900'>Login</button>
                        </div>
                    </form>
                    {/* <div className='w-full px-1 py-1 flex items-center justify-center'>
                        <button className='w-10 h-10 flex items-center justify-center bg-red-500 text-slate-100 rounded-full duration-150 hover:bg-red-600'><i className="fa-brands fa-google"></i></button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
