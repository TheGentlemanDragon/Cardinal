import { h } from 'preact'
import { useState } from 'preact/hooks'
import PropTypes from 'proptypes'

import { useGlobalBlur } from 'hooks'
import s from './style.css'

function getDisplayValue(item, labelKey) {
  if (typeof item === 'object' && labelKey in item) {
    return item[labelKey]
  } else if (typeof item !== 'object') {
    return item
  }
  return ''
}

function Select({ disabled, labelKey, name, onSelect, options, value }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => options.length > 1 && setIsOpen(true)
  const close = () => setIsOpen(false)

  const { blurRef } = useGlobalBlur(isOpen, close)

  return (
    <div class={s.Select}>
      <label>{name}</label>

      <div ref={blurRef} onClick={isOpen ? close : open}>
        <div class={s.Input}>{value}</div>
        <div class={isOpen ? s.Menu : s.MenuClosed}>
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
          <span class={s.CaretUp} />
        ) : (
          <span class={s.CaretDown} />
        )
      ) : null}
    </div>
  )
}

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

export default Select
