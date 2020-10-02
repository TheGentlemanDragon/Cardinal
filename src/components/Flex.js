import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

const FlexCss = css`
  display: flex;
`

Flex.propTypes = {
  align: PropTypes.string,
  direction: PropTypes.string,
  justify: PropTypes.string,
}

Flex.defaultProps = {
  align: 'stretch',
  direction: 'row',
  justify: 'flex-start',
}

export function Flex({ align, children, direction, justify }) {
  const style = {
    'flex-direction': direction,
    'justify-content': justify,
    'align-items': align,
  }
  return (
    <div class={FlexCss} style={style}>
      {children}
    </div>
  )
}
