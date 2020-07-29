import { route } from 'preact-router'

function pointInRect(point) {
  return function(rect) {
    return (
      rect.left <= point.x &&
      rect.right >= point.x &&
      rect.top <= point.y &&
      rect.bottom >= point.y
    )
  }
}

export function debounce(fn, delay) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Open url string in current window
 *
 * @export
 * @param {string} url address to visit
 */
export function goToUrl(url) {
  return function() {
    route(url)
  }
}

export function noop() {}

export function renderStyle(element = {}, baseStyle) {
  if (!element.style) {
    return {}
  }

  return Object.keys(element.style).reduce(
    (result, key) => {
      const item = element.style[key]
      result[key] = `${item.value}${item.unit || ''}`
      return result
    },
    { ...baseStyle }
  )
}

export function selectElement(index, setSelected) {
  return function(event) {
    const { x, y } = event

    // Shift elements to back
    const originalElements = Array.from(document.querySelectorAll('.element'))
    const elements = [
      ...originalElements.slice(index + 1),
      ...originalElements.slice(0, index + 1),
    ]

    // Get the first clicked on item from shifted array
    const clickedOn = pointInRect({ x, y })
    const clickedElement = elements.find(item =>
      clickedOn(item.getBoundingClientRect())
    )

    // Select that item by its index in original array
    const nextIndex = originalElements.indexOf(clickedElement)
    setSelected(nextIndex)
  }
}

export function withEventTargetValue(cb) {
  return function(event) {
    return cb(event.target.value)
  }
}

export function withToggle(setState, initialState) {
  return function() {
    setState(!initialState)
  }
}

// const EDGE_MARGIN = 4
// export function updateCursor(index, cursor, setCursor) {
//   return function(event) {
//     let mode = 'default'
//     const { x, y } = event

//     const elements = Array.from(document.getElementById('EditorCard').children)
//     const rect = elements[index].getBoundingClientRect()
//     const isPointInRect = pointInRect({ x, y })

//     const leftRect = {
//       left: rect.left - EDGE_MARGIN,
//       right: rect.left + EDGE_MARGIN,
//       top: rect.top - EDGE_MARGIN,
//       bottom: rect.bottom + EDGE_MARGIN,
//     }
//     const rightRect = {
//       left: rect.right - EDGE_MARGIN,
//       right: rect.right + EDGE_MARGIN,
//       top: rect.top - EDGE_MARGIN,
//       bottom: rect.bottom + EDGE_MARGIN,
//     }
//     const topRect = {
//       top: rect.top - EDGE_MARGIN,
//       bottom: rect.top + EDGE_MARGIN,
//       left: rect.left - EDGE_MARGIN,
//       right: rect.right + EDGE_MARGIN,
//     }
//     const bottomRect = {
//       top: rect.bottom - EDGE_MARGIN,
//       bottom: rect.bottom + EDGE_MARGIN,
//       left: rect.left - EDGE_MARGIN,
//       right: rect.right + EDGE_MARGIN,
//     }

//     if (
//       (isPointInRect(leftRect) && isPointInRect(topRect)) ||
//       (isPointInRect(rightRect) && isPointInRect(bottomRect))
//     ) {
//       mode = 'nw-resize'
//     } else if (
//       (isPointInRect(rightRect) && isPointInRect(topRect)) ||
//       (isPointInRect(leftRect) && isPointInRect(bottomRect))
//     ) {
//       mode = 'sw-resize'
//     } else if (isPointInRect(leftRect) || isPointInRect(rightRect)) {
//       mode = 'w-resize'
//     } else if (isPointInRect(topRect) || isPointInRect(bottomRect)) {
//       mode = 'n-resize'
//     }

//     if (cursor !== mode) {
//       setCursor(mode)
//     }
//   }
// }
