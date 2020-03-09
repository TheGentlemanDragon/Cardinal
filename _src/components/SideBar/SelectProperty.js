const SelectProperty = ({ label, value, options, onUpdate }) => (
  <div class="sidebar-property" container="row #spread @center">
    <label>{label}</label>

    <select onInput={onUpdate}>
      <option value="" selected={!options.includes(value)}>
        None
      </option>
      {options.map(opt => (
        <option value={opt} selected={opt === value}>
          {opt}
        </option>
      ))}
    </select>
  </div>
)

export default SelectProperty
