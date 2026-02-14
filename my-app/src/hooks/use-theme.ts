import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    if (theme) {
      root.classList.add(theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')
  }

  return { theme, setTheme, toggleTheme }
}