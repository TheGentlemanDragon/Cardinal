import { h } from 'preact'
import { useState } from 'preact/hooks'
import PropTypes from 'proptypes'

import { noop, withEventTargetValue } from 'lib/functional'
import s from './style.css'

function Select({
  disabled,
  labelKey,
  name,
  onSelect,
  options,
  value,
  valueKey,
}) {
  const [isOpen, setIsOpen] = useState(false)

  let displayedValue = ''
  const hasOptions = options.length > 0

  if (hasOptions && value) {
    displayedValue = value
  } else if (hasOptions && labelKey) {
    displayedValue = options[0][labelKey]
  } else if (hasOptions && typeof options[0] !== 'object') {
    displayedValue = options
  }

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div class={s.Select}>
      <label>{name}</label>

      <div onClick={toggleOpen}>
        <div class={s.Input}>{displayedValue}</div>
        <div class={isOpen ? s.Menu : s.MenuClosed}>
          {options.map(item => {
            let displayValue = ''
            if (typeof item === 'object' && labelKey in item) {
              displayValue = item[labelKey]
            } else if (typeof item !== 'object') {
              displayValue = item
            }
            const itemValue = valueKey ? item[valueKey] : item
            const isSelected = displayValue === displayedValue
            // console.info({ name, item })
            return (
              <div
                class={isSelected ? s.Selected : ''}
                onClick={isSelected ? noop : () => onSelect(itemValue)}
              >
                {displayValue}
              </div>
            )
          })}
        </div>
      </div>

      {isOpen ? <span class={s.CaretUp} /> : <span class={s.CaretDown} />}
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
  valueKey: PropTypes.string,
}

Select.defaultProps = {
  disabled: false,
  labelKey: '',
  options: [],
  value: '',
  valueKey: '',
}

export default Select
