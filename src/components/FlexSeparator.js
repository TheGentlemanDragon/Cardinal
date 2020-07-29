import { h } from 'preact'
import { css } from 'linaria'

const mainCss = css`
  flex: 1;
`

export function FlexSeparator() {
  return <div class={mainCss}></div>
}
