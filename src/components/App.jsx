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
        <section className='app'>
            {/* Protected routes */}
            <ProtectedRoutes>
                {/* App */}
                <Outlet />
                {/* Navbar */}
                <Navbar />
            </ProtectedRoutes>
        </section>
    )
}