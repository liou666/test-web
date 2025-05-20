import { sendIpc } from "@/utils"
import { useEffect, useRef, useState } from "react"

const useDark = () => {
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark")

  // useEffect(() => {
  //   const isDark = localStorage.getItem("theme") === "dark"
  //   setIsDark(isDark)
  //   console.log("11111")
  // }, [])

  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
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
