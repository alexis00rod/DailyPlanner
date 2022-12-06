import { useState, useEffect } from 'react'
import { Header } from "../components/Header"

export const Settings = () => {
    const [darkMode, setDarkMode] = useState(false)

    const handleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <section className="flex flex-col grow overflow-y-scroll">
            <Header title="Settings" />
            <main className="w-full px-2 py-2 flex flex-col grow">
                <ul className="container mx-auto grow bg-slate-100 rounded-lg shadow-lg">
                    <li className="w-full h-12 mt-1 px-3 py-2 flex items-center justify-between">
                        <div className="w-max h-full px-1 flex items-center gap-2">
                            <i class="text-2xl fa-solid fa-moon"></i>
                            <span>Dark Mode</span>
                        </div>
                        <button className={`relative w-14 h-7 inline-block rounded-full ${darkMode ? "bg-green-500" : "bg-slate-300"}`} onClick={handleDarkMode}>
                            <span className={`absolute top-0 bottom-0 z-10  w-7 h-full inline-block bg-slate-100 border-2 rounded-full ${darkMode?"right-0 border-green-500":"left-0 border-slate-300"}`}></span>
                        </button>
                    </li>
                </ul>
                {/* Agregar boton para cambiar de dark mode y boton para elegir color principal */}
            </main>
        </section>
    )
}
