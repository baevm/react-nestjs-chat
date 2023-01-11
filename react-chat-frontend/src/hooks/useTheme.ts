import { isServer } from '@utils/isServer'
import { useState, useEffect } from 'react'

type Theme = 'dark' | 'light' | null

const getTheme = (key: string) => {
  if (isServer) return null

  const theme = localStorage.getItem(key)
  return theme
}

export const useTheme = () => {
  const [theme, setTheme] = useState(getTheme('theme'))

  const changeTheme = (t: string) => {
    if (t) {
      localStorage.setItem('theme', t)
      document.body.dataset.theme = t
      setTheme(t)
    }
  }

  return { theme, changeTheme }
}
