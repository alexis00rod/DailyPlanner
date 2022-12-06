import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import 'tw-elements'
import { useUserContext } from './context/UserContext'
import { Loader } from './components/Loader'

export const App = () => {
    const location = useLocation()
    const{loading} = useUserContext()

    useEffect(() => {
        window.scrollTo(0,0)
    },[location])

    return (
        <main className='w-full h-screen flex flex-col bg-slate-200 text-slate-700'>
            {loading
                ?   <><Outlet />
                    <Navbar /></>
                :   <Loader />}
        </main>
    )
}
