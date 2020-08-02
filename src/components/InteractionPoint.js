import { h } from 'preact'
import { useCallback, useState, useEffect } from 'preact/hooks'
import PropTypes from 'proptypes'
import { css } from 'linaria'

const cursorMap = {
  tl: 'nw-resize',
  tc: 'n-resize',
  tr: 'ne-resize',
  ml: 'w-resize',
  mc: 'move',
  mr: 'e-resize',
  bl: 'sw-resize',
  bc: 's-resize',
  br: 'se-resize',
}

const mainCss = css`
  background-color: var(--clr-accent);
  height: 6px;
  opacity: 0.9;
  width: 6px;
  z-index: 102;
`

InteractionPoint.proptypes = {
  onUpdate: PropTypes.func.isRequired,
  position: PropTypes.oneOf([
    'tl',
    'tc',
    'tr',
    'ml',
    'mc',
    'mr',
    'bl',
    'bc',
    'br',
  ]).isRequired,
}

export function InteractionPoint({ onDrag, onDragEnd, position }) {
  const [start, setStart] = useState(null)

  const startInteraction = event => {
    // Prevent EditorCard onMouseDown for element selection
    event.cancelBubble = true
    setStart({ x: event.screenX, y: event.screenY })
  }

  const tickInteraction = useCallback(
    event => {
      const delta = { x: event.screenX - start.x, y: event.screenY - start.y }
      onDrag(delta)
    },
    [start]
  )

  const endInteraction = useCallback(() => {
    const delta = { x: event.screenX - start.x, y: event.screenY - start.y }

    document.removeEventListener('mousemove', tickInteraction)
    document.removeEventListener('mouseup', endInteraction)

    onDragEnd(delta)
  }, [start])

  useEffect(() => {
    if (!start) {
      return
    }

    document.addEventListener('mousemove', tickInteraction)
    document.addEventListener('mouseup', endInteraction)
  }, [start])

  return (
    <div
      class={mainCss}
      style={{ cursor: cursorMap[position] }}
      onMouseDown={startInteraction}
    />
  )
}
