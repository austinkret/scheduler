import { useState } from 'react'

export function useVisualMode(initial) {
  const [mode, setMode] =  useState(initial);
  const [history, setHistory] = useState([initial]);

  
  const transition = (newMode, replace) => {
    if (!replace) {
      setHistory([...history, newMode])
    }
    return setMode(newMode)
  }

  const back = () => {
    if (mode === initial) {
      return undefined
    }

    let newHistory = history.slice(0, -1)
    setHistory([...newHistory])
    setMode(history[history.length - 2])
  }

  return {mode, transition, back}
}

export default useVisualMode