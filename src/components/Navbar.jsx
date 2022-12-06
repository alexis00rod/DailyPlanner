import { Link, NavLink, useLocation } from 'react-router-dom'

const NavbarLink = ({children,...props}) => {
    return (
        <NavLink 
        {...props}
        className={({isActive}) => isActive ? "px-1 w-full h-16 flex flex-col items-center justify-center duration-150 text-slate-900" : "px-1 w-full h-16 flex flex-col items-center justify-center duration-150 text-slate-600  hover:text-slate-900"}
        >
            {children}
        </NavLink>
    )
}

export const Navbar = () => {
    const location = useLocation()

    return (
        <nav className='w-full px-1 py-1 flex flex-row items-center bg-slate-100'>
            <ul className='container mx-auto px-1 flex flex-row items-end grow'>
                <li className='px-1 flex flex-row items-center justify-center grow'>
                    <NavbarLink to='/'>
                        <i className="fa-solid fa-house text-xl"></i>
                        <span className='text-sm font-bold'>Home</span>
                    </NavbarLink>
                </li>
                <li className='px-1 flex flex-row items-center justify-center grow'>
                    <NavbarLink to='/calendar'>
                        <i className="fa-solid fa-calendar text-xl"></i>
                        <span className='text-sm font-bold'>Calendar</span>
                    </NavbarLink>
                </li>
                {
                    location.pathname !== "/add-task" && 
                    <li className='px-1 relative w-1/5 h-full flex flex-row items-center justify-center'>
                        <Link to='/add-task' className='absolute bottom-5 w-16 h-16 flex flex-col items-center justify-center flex-none text-slate-100 bg-slate-600 rounded-full shadow-md shadow-slate-600 duration-300 hover:bg-slate-900'>
                            <i className="fa-solid fa-plus text-xl"></i>
                        </Link>
                    </li>
                }
                <li className='px-1 flex flex-row items-center justify-center grow'>
                    <NavbarLink to='/profile'>
                        <i className="fa-solid fa-user text-xl"></i>
                        <span className='text-sm font-bold'>Profile</span>
                    </NavbarLink>
                </li>
                <li className='px-1 flex flex-row items-center justify-center grow'>
                    <NavbarLink to='/settings'>
                        <i className="fa-solid fa-gear text-xl"></i>
                        <span className='text-sm font-bold'>Settings</span>
                    </NavbarLink>
                </li>
            </ul>
        </nav>
    )
}
