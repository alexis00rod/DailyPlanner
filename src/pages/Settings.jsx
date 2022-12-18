import { useState } from "react"
import { Header, Main } from '../components/index'
import { useThemeContext } from "../context/ThemeContext"
import { logout } from '../service/auth'

export const Settings = () => {
    const { theme, handleTheme } = useThemeContext()

    return (
        <>
            <Header title="Ajustes" />
            <Main>
                <div className="section section-col">
                    {/* Cambiar tema */}
                    <div className="w-full max-w-screen-sm mx-auto px-2 py-2 flex flex-wrap gap-2">
                        <h4 className="px-2 py-1 font-semibold">Tema: </h4>
                        <div className="px-2 flex justify-center gap-4 grow">
                            <div className={`w-full max-w-xs px-3 py-3 bg-slate-200 rounded-lg cursor-pointer ${theme === "light" && "border-4 border-green-500"}`} onClick={handleTheme}>
                                <div className="px-3 py-3 bg-slate-100 rounded-lg">
                                    <span className="text-slate-900">Claro</span>
                                </div>
                            </div>
                            <div className={`w-full max-w-xs px-3 py-3 bg-slate-800 rounded-lg cursor-pointer ${theme === "dark" && "border-4 border-green-500"}`} onClick={handleTheme}>
                                <div className="px-3 py-3 bg-slate-900 rounded-lg">
                                    <span className="text-slate-100">Oscuro</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Logout */}
                    <div className="px-2 py-2">
                        <button className='btn btn-form mx-auto' onClick={logout}>Cerrar sesion</button>
                    </div>
                </div>
            </Main>
        </>
    )
}
