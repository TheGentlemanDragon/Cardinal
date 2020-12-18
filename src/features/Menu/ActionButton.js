import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { Icon } from '../Icon'

const ActionButtonCss = css`
  align-items: center;
  background-color: var(--clr-input-bg);
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  font-variant: small-caps;
  justify-content: space-between;
  padding-right: 0.75rem;
  width: 100%;

  & + div {
    margin-top: var(--margin-sm);
  }

  svg {
    background-color: var(--clr-input-bg-hover);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    height: 50px;
    padding: 10px;
    width: 50px;
  }

  &:hover {
    background-color: var(--clr-input-bg-hover);
  }
`

ActionButton.propTypes = {
  caption: PropTypes.string.isRequired,
  iconType: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

ActionButton.defaultProps = {
  iconType: '',
}

export function ActionButton({ caption, iconType, onClick }) {
  return (
    <div class={ActionButtonCss} onClick={onClick}>
      {iconType && <Icon type={iconType} />}
      {caption}
    </div>
  )
}
