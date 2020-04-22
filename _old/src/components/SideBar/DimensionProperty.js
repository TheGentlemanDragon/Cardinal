const DimensionProperty = ({ label, value, onUpdate }) => (
  <div class="sidebar-property half-width" container="row #spread @center">
    <label>{label}</label>
    <input type="number" value={value} onInput={onUpdate} />
  </div>
)

export default DimensionProperty
