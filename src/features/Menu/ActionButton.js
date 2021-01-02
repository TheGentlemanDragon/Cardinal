import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { Icon } from '../Icon'
import { noop } from '../../lib/utils'

const ActionButtonCss = css`
  align-items: center;
  background-color: var(--clr-input-bg);
  border: none;
  border-radius: var(--radius-sm);
  color: var(--clr-text-light);
  cursor: pointer;
  display: flex;
  font-size: 0.9rem;
  font-variant: small-caps;
  justify-content: space-between;
  padding: 0;
  padding-right: 1rem;
  text-decoration: none;
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
  href: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
}

ActionButton.defaultProps = {
  href: '',
  icon: '',
  onClick: noop,
}

export function ActionButton({ caption, href, icon, onClick }) {
  return href ? (
    <a class={ActionButtonCss} href={href}>
      {icon && <Icon type={icon} />}
      {caption}
    </a>
  ) : (
    <button class={ActionButtonCss} onClick={onClick}>
      {icon && <Icon type={icon} />}
      {caption}
    </button>
  )
}
