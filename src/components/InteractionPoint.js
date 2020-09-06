import { h } from 'preact'
import { useCallback, useState, useEffect } from 'preact/hooks'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { Icon } from './Icon'

const mainCss = css`
  height: 10px;
  opacity: 0.9;
  width: 10px;

  & svg {
    width: 12px;
    height: 12px;
    fill: var(--clr-accent);
  }
`

const moveCss = css`
  top: -1px;
  left: 1px;
  position: absolute;
  z-index: 103;
`

const sizeCss = css`
  bottom: 4px;
  position: absolute;
  right: 2px;
  z-index: 102;
`

InteractionPoint.propTypes = {
  bounds: PropTypes.object.isRequired,
  onDrag: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['move', 'resize']).isRequired,
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
      onMouseDown={startInteraction}
    >
      <Icon type={type} />
    </div>
  )
}
