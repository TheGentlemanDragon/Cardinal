import { useRef, useEffect } from 'preact/hooks'

export default function useGlobalBlur(isActive, onBlur) {
  const blurRef = useRef(null)

  const tryBlur = event => {
    if (!blurRef.current.contains(event.srcElement)) {
      onBlur()
    }
  }

  useEffect(() => {
    if (!isActive) {
      return
    }

    document.addEventListener('click', tryBlur)
    return () => document.removeEventListener('click', tryBlur)
  }, [isActive])

  return { blurRef }
}
