import { Link, useLocation, useNavigate } from "react-router-dom"
import { useUserContext } from '../context/UserContext'

export const Header = ({title}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const {userLogged} = useUserContext()

    return (
        <header className="sticky top-0 left-0 w-full h-max z-20 px-2 py-2 flex items-center gap-2 bg-slate-100 lg:px-4">
            <div className="container mx-auto flex items-center gap-2">
                <div className='px-1 py-1'>
                    {location.pathname === "/" || location.pathname === "/all" || location.pathname === "/completed"
                    ?   <Link to="/profile" className="w-10 h-10 flex flex-none flex-row items-center justify-center flex-none border-2 border-slate-600 rounded-full duration-150 overflow-hidden hover:border-slate-500">
                            <img src={userLogged.photo} alt={userLogged.name} className='w-full h-full object-cover'/>
                        </Link>
                    : <button className='w-10 h-10 flex flex-none flex-row items-center justify-center text-slate-600 duration-300 hover:text-slate-900' onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i></button>}
                </div>
                <div className='h-14 px-1 flex flex-col justify-center grow'>
                    <h2 className="text-2xl font-bold">{title}</h2>
                </div>
            </div>
        </header>
    )
}
