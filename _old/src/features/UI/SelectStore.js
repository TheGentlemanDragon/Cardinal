import { h } from "preact";
import PropTypes from "proptypes";

import { Select } from "./Select";
import { useCollectionQuery } from "../../hooks/data";
import { getDisplayValue, sortByKey } from "../../lib/utils";

SelectStore.propTypes = {
  collection: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  labelKey: PropTypes.string,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  query: PropTypes.object,
  value: PropTypes.any,
  valueKey: PropTypes.string,
};

SelectStore.defaultProps = {
  disabled: false,
  labelKey: "",
  query: undefined,
  value: "",
  valueKey: "",
};

export function SelectStore({
  collection,
  disabled,
  labelKey,
  name,
  onSelect,
  query,
  value,
  valueKey,
}) {
  const { data } = useCollectionQuery(collection);
  const options = data.sort(sortByKey(labelKey));

  const selected =
    options.find((item) =>
      valueKey
        ? item[valueKey] === value
        : getDisplayValue(item, labelKey) === value
    ) || {};

  return (
    <Select
      name={name}
      labelKey={labelKey}
      options={options}
      onSelect={onSelect}
      value={valueKey ? selected[labelKey] : value}
    />
  );
}
