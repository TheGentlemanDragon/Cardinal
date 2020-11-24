import { useRef, useEffect } from 'preact/hooks'

export function useSelectOnFocus() {
  const selectRef = useRef(null)

  const trySelect = event => {
    selectRef.current.select()
  }

  useEffect(() => {
    selectRef.current.addEventListener('focus', trySelect)
    return () => selectRef.current.removeEventListener('focus', trySelect)
  }, [])

  return selectRef
}
