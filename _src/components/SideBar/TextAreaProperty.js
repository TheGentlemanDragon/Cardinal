const TextAreaProperty = ({ label, value, onUpdate }) => (
  <div class="sidebar-property large" container="column #left">
    <label>{label}</label>

    <textarea type="text" value={value} onInput={onUpdate} />
  </div>
)

export default TextAreaProperty
