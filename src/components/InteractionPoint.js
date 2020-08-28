import { h } from 'preact'
import { useCallback, useState, useEffect } from 'preact/hooks'
import PropTypes from 'proptypes'
import { css } from 'linaria'

const cursorMap = {
  move: 'move',
  size: 'se-resize',
}

const mainCss = css`
  height: 10px;
  opacity: 0.9;
  width: 10px;
  z-index: 102;
`

const moveCss = css`
  background-color: blue;
  left: 50%;
  position: relative;
  top: 50%;
  transform: translate(-50%, -50%);
`

const sizeCss = css`
  background-color: red;
  bottom: 0;
  position: absolute;
  right: 0;
`

InteractionPoint.propTypes = {
  bounds: PropTypes.object.isRequired,
  onDrag: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['move', 'size']).isRequired,
}

export function InteractionPoint({ bounds, onDrag, onDragEnd, type }) {
  const [start, setStart] = useState(null)

  const startInteraction = event => {
    // Prevent EditorCard onMouseDown for element selection
    event.cancelBubble = true
    setStart({ x: event.screenX, y: event.screenY })
  }

  const tickInteraction = useCallback(
    event => {
      const delta = { x: event.screenX - start.x, y: event.screenY - start.y }
      delta.x = Math.max(delta.x, bounds.minX)
      delta.x = Math.min(delta.x, bounds.maxX)
      delta.y = Math.max(delta.y, bounds.minY)
      delta.y = Math.min(delta.y, bounds.maxY)
      onDrag(delta)
    },
    [start]
  )

  const endInteraction = useCallback(() => {
    const delta = { x: event.screenX - start.x, y: event.screenY - start.y }
    delta.x = Math.max(delta.x, bounds.minX)
    delta.x = Math.min(delta.x, bounds.maxX)
    delta.y = Math.max(delta.y, bounds.minY)
    delta.y = Math.min(delta.y, bounds.maxY)

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
      class={`${mainCss} ${type === 'move' ? moveCss : sizeCss}`}
      style={{ cursor: cursorMap[type] }}
      onMouseDown={startInteraction}
    />
  )
}
