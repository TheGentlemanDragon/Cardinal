import { h } from 'preact'
import { css } from 'linaria'

import { goToUrl } from '../lib/utils'

const mainCss = css`
  background-color: var(--clr-bg-card);
  border-radius: var(--radius-sm);
  box-shadow: var(--box-shadow-md);
  color: var(--clr-text-dark);
  cursor: pointer;
  display: flex;
  height: 8rem;
  margin: 0 0 1.2rem;

  &:hover dt {
    text-decoration: underline;
  }

  figure {
    align-items: center;
    border: var(--border-light);
    display: flex;
    justify-content: center;
    margin: 1rem 2rem 1rem 1rem;
    min-width: 10rem;
  }
`

GameItem.defaultProps = {
  game: {},
}

export function GameItem({ game }) {
  return (
    <>
      <div class={mainCss} onClick={goToUrl(`games/${game.$id}`)}>
        <figure>Preview</figure>
        <dl>
          <dt>{game.name}</dt>
          <dd>{game.description}</dd>
        </dl>
        <menu>
          <menuitem />
        </menu>
      </div>
    </>
  )
}
