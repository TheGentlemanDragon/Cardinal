import { h } from 'preact'
import { css } from 'linaria'

const ToggleCss = css`
  background-color: #bbb3;
  height: 24px;
  margin-left: 20px;
  border-radius: 6px;
  width: 64px;

  .toggle-switch {
    background-color: #fff;
    border-radius: inherit;
    display: inline-block;
    height: inherit;
    margin-left: 0;
    width: 32px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.3);
  }

  .toggle-container-on {
    background-color: #daa520;

    & .toggle-switch {
      margin-left: 32px;
    }
  }
`

export function Toggle({ label, value, onUpdate }) {
  return (
    <div class={ToggleCss} onClick={onUpdate}>
      <label class="two-thirds-width">{label}</label>
      <span class={'toggle-container-' + (value ? 'on' : 'off')}>
        <i class={`toggle-switch`} />
      </span>
    </div>
  )
}
