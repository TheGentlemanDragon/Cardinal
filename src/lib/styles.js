import { css } from 'linaria'

export const PageCss = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100vh;
  padding: var(--g-padding-page-top) calc((100vw - 800px) / 2) 32px;
`
