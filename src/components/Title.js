import { h } from 'preact'
import { css } from 'linaria'

const TitleCss = css`
  color: #fff;
  font-size: 2rem;
  font-weight: 400;
  line-height: 2rem;
  margin-bottom: var(--g-margin-lg);
  margin-top: var(--g-padding-vertical);
  text-align: center;
  text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.6);
`

export function Title() {
  return <h1 class={TitleCss}>Cardinal</h1>
}
