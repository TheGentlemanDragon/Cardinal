import './ToggleProperty.styl'

const ToggleProperty = ({ label, value, onUpdate }) => (
  <div
    class="sidebar-property clickable"
    container="row #spread @center"
    onClick={onUpdate}
  >
    <span class={'toggle-container-' + (value ? 'on' : 'off')}>
      <i class={`toggle-switch`} />
    </span>
    <label class="two-thirds-width clickable">{label}</label>
  </div>
)

export default ToggleProperty
