import { useState, useEffect, createContext, useContext } from 'react'

const ThemeContext = createContext()
export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('');

	const localTheme = localStorage.getItem("theme")

	useEffect(() => {
		localTheme ? setTheme(localTheme) : localStorage.setItem("theme", "light")
	},[])

	useEffect(() => {
		localStorage.setItem("theme", theme)
		theme === "dark" ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark")
	},[theme])

    return <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
    </ThemeContext.Provider>
}