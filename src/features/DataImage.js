import { h } from 'preact'
import { useMemo } from 'preact/hooks'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { cls } from '../lib/utils'

const DataImageCss = css`
  left: 0;
  position: absolute;
  top: 0;
`

DataImage.propTypes = {
  height: PropTypes.number,
  image: PropTypes.object.isRequired,
  offset: PropTypes.object,
  width: PropTypes.number,
}

DataImage.defaultProps = {
  height: 0,
  offset: { x: 0, y: 0 },
  width: 0,
}

export function DataImage({ height, image, offset, width }) {
  const objectUrl = useMemo(() => URL.createObjectURL(image.data), [image])
  return (
    <img
      class={DataImageCss}
      src={objectUrl}
      onLoad={() => URL.revokeObjectURL(image.data)}
      style={cls(
        `transform: translateX(${offset.x}px) translateY(${offset.y}px);`,
        height ? `height: ${height}px;` : '',
        width ? `width: ${width}px;` : ''
      )}
    />
  )
}
