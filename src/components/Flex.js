import { h } from 'preact'
import PropTypes from 'proptypes'
import { styled } from 'linaria/react'

const FlexCss = styled.div`
  display: flex;
  align-items: ${props => props.align};
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
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
  return (
    <FlexCss
      align={align}
      children={children}
      direction={direction}
      justify={justify}
    >
      {children}
    </FlexCss>
  )
}
