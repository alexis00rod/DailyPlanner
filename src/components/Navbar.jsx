import { Link, NavLink, useLocation } from 'react-router-dom'

const NavbarLink = ({children,...props}) => {
    return <NavLink {...props} 
                className={({isActive}) => `${isActive ? "navbar-link-active" : "navbar-link"}`}>
                {children}
            </NavLink>
}

export const Navbar = () => {
    const {pathname} = useLocation()

    return <nav className='navbar'>
                <ul className='navbar-wrapper'>
                    <li className='navbar-item'>
                        <NavbarLink to='/'>
                            <i className="fa-solid fa-house text-xl"></i>
                            <span className='text-sm font-bold hidden md:block'>Inicio</span>
                        </NavbarLink>
                    </li>
                    <li className='navbar-item'>
                        <NavbarLink to='/calendar'>
                            <i className="fa-solid fa-calendar text-xl"></i>
                            <span className='text-sm font-bold hidden md:block'>Calendario</span>
                        </NavbarLink>
                    </li>
                    {pathname !== "/add-task" && 
                    <li className='navbar-item'>
                        <Link to='/add-task' className='navbar-btn'>
                            <i className="fa-solid fa-plus text-xl"></i>
                        </Link>
                    </li>}
                    <li className='navbar-item'>
                        <NavbarLink to='/profile'>
                            <i className="fa-solid fa-user text-xl"></i>
                            <span className='text-sm font-bold hidden md:block'>Perfil</span>
                        </NavbarLink>
                    </li>
                    <li className='navbar-item'>
                        <NavbarLink to='/settings'>
                            <i className="fa-solid fa-gear text-xl"></i>
                            <span className='text-sm font-bold hidden md:block'>Ajustes</span>
                        </NavbarLink>
                    </li>
                </ul>
            </nav>
}
