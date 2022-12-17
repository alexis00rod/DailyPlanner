import { Link, useLocation, useNavigate } from "react-router-dom"
import { useUserContext } from '../context/UserContext'

export const Header = ({title}) => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const {userLogged:{photoURL,email}} = useUserContext()

    return <header className="header">
                <div className="header-wrapper">
                    <div className='px-1 py-1'>
                        {pathname === "/" || pathname === "/work" || pathname === "/personal" || pathname === "/other"
                        ?   <Link to="/profile" className="btn btn-photo">
                                <img src={photoURL} alt={email} className='w-full h-full object-cover'/>
                            </Link>
                        : <button className='btn btn-navigate' onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i></button>}
                    </div>
                    <div className='px-1 py-1 flex flex-col justify-center grow'>
                        <h2 className="px-1 py-1 text-2xl font-bold">{title}</h2>
                    </div>
                </div>
            </header>
}
