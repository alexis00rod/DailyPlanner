import { useState, useEffect, createContext, useContext } from 'react'

const ThemeContext = createContext()
export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(null);

	useEffect(() => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	}, []);

	const handleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

    useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [theme]);

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [theme]);

    // !theme && document.documentElement.classList.add("dark")
    // theme && document.documentElement.classList.remove("dark")

    return <ThemeContext.Provider value={{ theme, setTheme, handleTheme }}>
        {children}
    </ThemeContext.Provider>
}