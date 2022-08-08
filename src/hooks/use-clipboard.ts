import { Clipboard } from "react-native"
import React, { useCallback, useEffect } from 'react'

const useClipboard = (text: string) => {
  const [isCopied, setIsCopied] = React.useState(false)

  const onCopy = useCallback(() => {
    Clipboard.setString(text)
    setIsCopied(true)
  }, [text])

  useEffect(() => {
    let timeoutId: number | null = null

    if (isCopied) {
      timeoutId = setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }

  }, [isCopied])


  return { isCopied, onCopy }
}

export default useClipboard
