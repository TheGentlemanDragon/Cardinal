import { h } from 'preact'
import { css } from 'linaria'

import { useEditorContext } from '../contexts/EditorContext'
import { withEventTargetValue } from '../lib/utils'

const mainCss = css`
  display: flex;
  align-items: center;

  label {
    margin-right: var(--g-margin-md);
    text-shadow: var(--text-shadow-sm);
  }

  input[type='range'] {
    -webkit-appearance: none;
    background: transparent;
    width: 100%;
  }

  input[type='range']:focus {
    outline: none;
  }

  input[type='range']::-webkit-slider-runnable-track {
    background-color: #333;
    border-radius: 2px;
    box-shadow: var(--box-shadow-sm);
    cursor: pointer;
    height: 0.25rem;
    width: 100%;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #ffffff;
    border-radius: 0.5rem;
    box-shadow: var(--box-shadow-sm);
    cursor: pointer;
    height: 1rem;
    margin-top: -6px;
    width: 1rem;
  }
`

/** List games for the main page */
export function ScaleSlider() {
  const { scale, set } = useEditorContext()

  return (
    <div class={mainCss}>
      <label>Scale</label>
      <input
        type="range"
        id="cardScale"
        name="cardScale"
        min="1"
        max="4"
        step="0.05"
        value={scale}
        onInput={withEventTargetValue(set.scale)}
      />
    </div>
  )
}
