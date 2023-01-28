import { isServer } from '@utils/isServer'
import { useState } from 'react'

type Theme = 'dark' | 'light' | null

const getTheme = (key: string): Theme => {
  if (isServer) return null

  const theme = localStorage.getItem(key)
  return theme as Theme
}

export const useTheme = () => {
  const [theme, setTheme] = useState(getTheme('theme'))

  const changeTheme = (t: Theme) => {
    if (!t) return

    localStorage.setItem('theme', t)
    document.body.dataset.theme = t
    setTheme(t)
  }

  return { theme, changeTheme }
}
