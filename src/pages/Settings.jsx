import { Header } from "../components/Header"
import { Main } from '../components/Main'
import { logout } from '../service/auth'

export const Settings = () => {

    return (
        <>
            <Header title="Settings" />
            <Main>
                <ul className="section">
                    {/* Dark mode */}
                    <li className="w-full px-2 py-2 flex items-center justify-between">
                        <div className="w-max h-full px-1 flex items-center gap-2">
                            <i className="text-2xl fa-solid fa-moon"></i>
                            <span>Dark Mode</span>
                        </div>
                        {/* <button className={`relative w-14 h-7 inline-block rounded-full ${theme ? "bg-green-500" : "bg-slate-300"}`} onClick={() => setTheme(!theme)}>
                            <span className={`absolute top-0 bottom-0 z-10  w-7 h-full inline-block bg-slate-100 border-2 rounded-full ${theme ?"right-0 border-green-500":"left-0 border-slate-300"}`}></span>
                        </button> */}
                    </li>
                    {/* Logout */}
                    <li className='w-full px-2 py-2 flex items-center'>
                        <button className='w-max px-2 py-1 text-slate-500 font-semibold duration-150 hover:text-slate-900' onClick={logout}>Logout</button>
                    </li>
                </ul>
            </Main>
        </>
    )
}
