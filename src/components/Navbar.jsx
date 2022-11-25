import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className='fixed left-0 bottom-0 w-full h-max px-1 py-1 flex flex-row items-center gap-4 bg-white shadow-lg'>
            <ul className='mx-2 px-1 py-1 flex flex-row items-center grow gap-4'>
                <li className='w-max px-1 py-1 flex flex-row items-center justify-center flex-none'>
                    <NavLink to='/' className='px-1 py-1 w-20 h-16 flex flex-col justify-center items-center rounded-lg text-white bg-violet-500 duration-300 hover:bg-violet-600'>
                        <i className="fa-solid fa-list-check text-xl"></i>
                        <span className='font-bold'>Tasks</span>
                    </NavLink>
                </li>
                <li className='w-max px-1 py-1 flex flex-row items-center justify-center flex-none'>
                    <NavLink to='/profile' className='px-1 py-1 w-20 h-16 flex flex-col justify-center items-center rounded-lg text-white bg-violet-500 duration-300 hover:bg-violet-600'>
                        <i className="fa-solid fa-user text-xl"></i>
                        <span className='font-bold'>Profile</span>
                    </NavLink>
                </li>
                <li className='w-max px-1 py-1 flex flex-row items-center justify-center flex-none'>
                    <NavLink to='/settings' className='px-1 py-1 w-20 h-16 flex flex-col justify-center items-center rounded-lg text-white bg-violet-500 duration-300 hover:bg-violet-600'>
                        <i className="fa-solid fa-gear text-xl"></i>
                        <span className='font-bold'>Settings</span>
                    </NavLink>
                </li>
            </ul>
            <div className='mx-2 px-1 py-1'>
                <Link to='/add-task' className='w-16 h-16 flex flex-col justify-center items-center rounded-full text-white bg-violet-500 duration-300 hover:bg-violet-600'>
                    <i className="fa-solid fa-plus text-xl"></i>
                </Link>
            </div>
        </nav>
    )
}
