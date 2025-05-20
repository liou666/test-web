import { sendIpc } from "@/utils"
import { useEffect, useState } from "react"

const useDark = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark"
    setIsDark(isDark)
  }, [])


  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      console.log('dark')
      sendIpc({
        name: 'on_theme_changed',
        type: 'dark'
      })
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      console.log('light')
      sendIpc({
        name: 'on_theme_changed',
        type: 'light'
      })
    }
  }, [isDark])

  return { isDark, setIsDark }
}

export default useDark
