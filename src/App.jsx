import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar'

export const App = () => {

    return (
        <main className='w-full min-h-screen bg-slate-100 text-slate-700'>
            <Navbar />
            <Outlet />
        </main>
    )
}
