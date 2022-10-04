import React, { createContext, useState } from 'react'
import defautlTheme from '../themes/default'
import darkTheme from '../themes/dark'
import { ColorValue } from 'react-native'

export type Theme = {
  backgroundColor: ColorValue
  darkColor: ColorValue
  darkGreyColor: ColorValue
  primaryColor: ColorValue
  primaryLightColor: ColorValue
  primaryGreyColor: ColorValue
  accentColor: ColorValue
  accentGreyColor: ColorValue
  errorColor: ColorValue
  errorGreyColor: ColorValue
}

type ThemeContextValue = {
  theme: Theme
  selectTheme: (themeName: 'dark' | 'default') => void
  toggleDarkMode: () => void
}

export const ThemeContext: React.Context<ThemeContextValue> = createContext(
  {} as ThemeContextValue
)

const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defautlTheme)

  function selectTheme(themeName: string) {
    if (themeName === 'dark') {
      setCurrentTheme(darkTheme)
      return
    } else if (themeName === 'default') {
      setCurrentTheme(defautlTheme)
      return
    }
  }

  function toggleDarkMode() {
    setCurrentTheme((currTheme) => {
      console.log(currTheme)
      if (currTheme === darkTheme) return defautlTheme
      return darkTheme
    })
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        selectTheme,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
