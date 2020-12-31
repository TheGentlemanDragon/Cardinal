import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { Icon } from '../Icon'

const ActionButtonCss = css`
  align-items: center;
  background-color: var(--clr-input-bg);
  border: none;
  border-radius: var(--radius-sm);
  color: var(--clr-text-light);
  cursor: pointer;
  display: flex;
  font-variant: small-caps;
  justify-content: space-between;
  padding: 0;
  padding-right: 1rem;
  width: 100%;

  & + button {
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
    <button class={ActionButtonCss} onClick={onClick}>
      {iconType && <Icon type={iconType} />}
      {caption}
    </button>
  )
}
