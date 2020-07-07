import { createContext } from 'preact'
import { useState } from 'preact/hooks'

const contextKey = 'EditorContext'

let initial = JSON.parse(localStorage.getItem(contextKey))

if (!initial) {
  initial = {
    scale: 2.0,
  }
}

const EditorContext = createContext({
  scale: 0,
  setScale: () => {},
})

export default EditorContext

export function withEditorContext(Component, persist) {
  return function(props) {
    const [scale, setScale] = useState(initial.scale)

    const value = {
      scale,
      setScale: scale => {
        if (persist) {
          const data = JSON.parse(localStorage.getItem(contextKey)) || {}
          localStorage.setItem(contextKey, JSON.stringify({ ...data, scale }))
        }

        setScale(scale)
      },
    }

    return (
      <EditorContext.Provider value={value}>
        <Component {...props} />
      </EditorContext.Provider>
    )
  }
}
