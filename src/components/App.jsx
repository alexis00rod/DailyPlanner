import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'
import { Navbar } from './Navbar'

export const App = () => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0,0)
    },[location])

    return (
        <div className='w-full h-screen flex flex-col bg-slate-200 text-slate-700'>
            <ProtectedRoutes>
                <section className='flex flex-col grow overflow-y-scroll'>
                    <Outlet />
                    <Navbar />
                </section>
            </ProtectedRoutes>
        </div>
    )
}