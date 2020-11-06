import { h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

export function useEditableValue(initial, onSave) {
  const [state, setState] = useState({ value: initial, isEditMode: false })
  const { value, isEditMode } = state
  const input = useRef(null)

  useEffect(() => {
    if (!isEditMode) {
      return
    }

    input.current.focus()
    input.current.select()
  }, [isEditMode])

  const edit = () => setState({ value, isEditMode: true })

  const cancel = () => setState({ value, isEditMode: false })

  const save = () => {
    onSave(input.current.value)
    setState({ value: input.current.value, isEditMode: false })
  }

  const checkKeyDown = event => {
    if (event.key === 'Enter') {
      save(event.target.value)
    } else if (event.key === 'Escape') {
      cancel()
    }
  }

  return {
    Node: isEditMode ? (
      <input
        type="text"
        ref={input}
        value={state.value}
        onKeyDown={checkKeyDown}
      />
    ) : (
      value
    ),
    isEditMode,
    cancel,
    edit,
    save,
  }
}
