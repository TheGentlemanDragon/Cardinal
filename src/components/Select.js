import { h } from 'preact'
import { useState } from 'preact/hooks'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { useGlobalBlur } from 'hooks'
import { getDisplayValue } from 'lib/utils'

const mainCss = css`
  display: flex;
  align-items: center;

  label {
    margin-right: var(--g-margin-md);
    text-shadow: var(--text-shadow-sm);
  }
`

const inputCss = css`
  background-color: var(--clr-input);
  border-radius: var(--radius-md);
  color: var(--clr-text-dark);
  cursor: pointer;
  height: var(--input-height);
  overflow: hidden;
  padding: var(--input-padding-vertical) var(--input-padding-horizontal);
  padding-right: 1.6rem;
  text-overflow: ellipsis;
  user-select: none;
  white-space: nowrap;
  width: var(--input-min-width);
`

const caretCss = css`
  background-image: url(../assets/icons/caret-down.png);
  cursor: pointer;
  height: 16px;
  margin-left: -26px;
  margin-top: 1px;
  pointer-events: none;
  transition: linear 0.15s transform;
  width: 16px;
`

const caretUpCss = css`
  transform: rotate(180deg);
`

const menuClosedCss = css`
  background-color: var(--clr-input);
  border-radius: var(--radius-md);
  bottom: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
  padding: var(--input-padding-vertical) 0;
  position: absolute;
  z-index: -1;
`

const menuCss = css`
  background-color: var(--clr-input);
  border-radius: var(--radius-md);
  bottom: calc(var(--input-height) + var(--input-padding-vertical));
  height: unset;
  opacity: 1;
  overflow: hidden;
  padding: var(--input-padding-vertical) 0;
  position: absolute;
  transition: bottom 0.5s, opacity 0.5s;
  z-index: unset;

  > div {
    align-items: center;
    display: flex;
    height: var(--input-height);
    justify-content: flex-start;
    padding: var(--input-padding-vertical) var(--input-padding-horizontal);
  }

  > div {
    color: var(--clr-text-dark);
    opacity: 0.6;
  }

  > div:hover {
    cursor: pointer;
    opacity: 1;
  }
`

Select.propTypes = {
  disabled: PropTypes.bool,
  labelKey: PropTypes.string,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.array,
  value: PropTypes.any,
}

Select.defaultProps = {
  disabled: false,
  labelKey: '',
  options: [],
  value: '',
}

export function Select({ disabled, labelKey, name, onSelect, options, value }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => options.length > 1 && setIsOpen(true)
  const close = () => setIsOpen(false)

  const { blurRef } = useGlobalBlur(isOpen, close)

  return (
    <div class={`${mainCss} inputContainer`}>
      <label>{name}</label>

      <div ref={blurRef} onClick={isOpen ? close : open}>
        <div class={inputCss}>{value}</div>
        <div class={isOpen ? menuCss : menuClosedCss}>
          {options
            .filter(item => getDisplayValue(item, labelKey) !== value)
            .map(item => (
              <div onClick={() => onSelect(item)}>
                {getDisplayValue(item, labelKey)}
              </div>
            ))}
        </div>
      </div>

      {options.length > 1 ? (
        isOpen ? (
          <span class={`${caretCss} ${caretUpCss}`} />
        ) : (
          <span class={caretCss} />
        )
      ) : null}
    </div>
  )
}
