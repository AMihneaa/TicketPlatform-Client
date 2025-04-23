import { createContext, useEffect, useState, useContext, ReactNode } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem("theme")
      return stored === "light" || stored === "dark" ? stored : "light"
    } catch {
      return "light"
    }
  })

  useEffect(() => {
    try {
      if (theme === "light" || theme === "dark") {
        document.body.classList.remove("light", "dark")
        document.body.classList.add(theme)
        localStorage.setItem("theme", theme)
      }
    } catch (error) {
      console.error("💥 Error applying theme:", error)
    }
  }, [theme])  

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
