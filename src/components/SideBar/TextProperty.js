const TextProperty = ({ label, value, onUpdate }) => (
  <div class="sidebar-property" container="row #spread @center">
    <label>{label}</label>

    <input type="text" value={value} onInput={onUpdate} />
  </div>
)

export default TextProperty
