import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import PropTypes from 'proptypes'

import { Select } from '../components/Select'
import { DataStore } from '../lib/datastore'
import { getDisplayValue, sortArrayByKey } from '../lib/utils'

SelectCollection.propTypes = {
  collection: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  labelKey: PropTypes.string,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  query: PropTypes.object,
  value: PropTypes.any,
  valueKey: PropTypes.string,
}

SelectCollection.defaultProps = {
  disabled: false,
  labelKey: '',
  query: undefined,
  value: '',
  valueKey: '',
}

export function SelectCollection({
  collection,
  disabled,
  labelKey,
  name,
  onSelect,
  query,
  value,
  valueKey,
}) {
  const [options, setOptions] = useState([])

  const selected =
    options.find(item =>
      valueKey
        ? item[valueKey] === value
        : getDisplayValue(item, labelKey) === value
    ) || {}

  useEffect(() => {
    DataStore[collection]
      .list(query)
      .then(sortArrayByKey(labelKey))
      .then(setOptions)
  }, [collection, query])

  return (
    <Select
      name={name}
      labelKey={labelKey}
      options={options}
      onSelect={onSelect}
      value={valueKey ? selected[labelKey] : value}
    />
  )
}
