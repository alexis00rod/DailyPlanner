import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Message } from '../components/Message'
import { signup } from '../service/auth'
import { addUserToDb } from '../service/firestore'

export const Signup = () => {
    const [userToSignup, setUserToSignup] = useState({})
    const [errorMessage, setErrorMessage] = useState()
    const navigate = useNavigate()

    const signupUser = async e => {
        e.preventDefault()
        setErrorMessage("")
        try {
            await signup(userToSignup)
            await addUserToDb(userToSignup)
            navigate('/login')
        } catch (err) {
            setErrorMessage(err.code)
        }
    }

    const handleUserToSignup = ({target:{name,value}}) => {
        setUserToSignup({
            ...userToSignup,
            [name]:value
        })
    }

    return (
        <div className="w-full h-screen bg-slate-200">
            <div className="container h-full mx-auto px-2 py-2 flex flex-col justify-center items-center">
                <div className='w-full max-w-screen-sm mx-auto px-2 py-2 bg-slate-100 flex flex-col items-center rounded-lg shadow-lg'>
                    <div className='w-full px-2 py-2 flex flex-col items-center'>
                        <h2 className='w-max mb-2 px-1 py-2 text-4xl font-bold'>Signup</h2>
                        <p className="w-max px-1 py-1 flex items-center gap-2">Are you a user? <Link to='/login' className="text-slate-700 font-semibold duration-150 hover:text-slate-900">Login</Link></p>
                    </div>
                    <form className='w-full mx-auto px-2 py-2 flex flex-col justify-evenly md:justify-start md:gap-2' onSubmit={signupUser}>
                        {/* Error message */}
                        {errorMessage && <Message color="red" message={errorMessage} />}
                        {/* User name */}
                        {/* <div className='px-1 py-1 flex flex-col gap-1'>
                            <label htmlFor="name" className="px-2 py-1 text-sm font-semibold cursor-pointer">Name</label>
                            <input type="text" name='name' id='name' className='h-10 px-3 bg-slate-100 border-2 border-slate-500 rounded-lg shadow-inner focus:outline-none focus:border-cyan-500 focus:shadow-lg' onChange={handleUserToSignup} required/>
                        </div> */}
                        {/* User email */}
                        <div className='px-1 py-1 flex flex-col gap-1'>
                            <label htmlFor="email" className="px-2 py-1 text-sm font-semibold cursor-pointer">Email</label>
                            <input type="text" name='email' id='email' className='h-10 px-3 bg-slate-100 border-2 border-slate-500 rounded-lg shadow-inner focus:outline-none focus:border-cyan-500 focus:shadow-lg' onChange={handleUserToSignup} required/>
                        </div>
                        {/* User password */}
                        <div className='px-1 py-1 flex flex-col gap-1'>
                            <label htmlFor="password" className="px-2 py-1 text-sm font-semibold cursor-pointer">Password</label>
                            <input type="password" name='password' id='password' className='h-10 px-3 bg-slate-100 border-2 border-slate-500 rounded-lg shadow-inner focus:outline-none focus:border-cyan-500 focus:shadow-lg' onChange={handleUserToSignup} required/>
                        </div>
                        {/* User birth */}
                        {/* <div className='px-1 py-1 flex flex-col'>
                            <label htmlFor="taskDay" className="px-2 py-1 text-sm font-semibold cursor-pointer">Birth</label>
                            <input 
                            type="date" 
                            name="birth" 
                            id='birth' 
                            className='h-10 px-3 bg-slate-100 border-2 border-slate-500 rounded-lg shadow-inner focus:outline-none focus:border-cyan-500 focus:shadow-lg'
                            onChange={handleUserToSignup}
                            required
                            />
                        </div> */}
                        {/* Submit */}
                        <div className='px-1 py-2'>
                            <button type='submit' className='w-max h-9 mx-auto px-4 flex items-center rounded-full bg-slate-600 text-slate-100 font-semibold duration-150 hover:bg-slate-900'>Sign up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
