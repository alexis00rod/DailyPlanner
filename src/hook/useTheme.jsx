import { useState, useEffect } from 'react'

export const useTheme = () => {
    const [theme, setTheme] = useState(true)

    !theme && document.documentElement.classList.add("dark")
    theme && document.documentElement.classList.remove("dark")

    return { theme, setTheme }
}
