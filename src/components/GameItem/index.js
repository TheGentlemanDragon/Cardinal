import { h } from 'preact'

import { goToUrl } from 'lib/utils'
import s from './style.css'

function GameItem({ game }) {
  return (
    <>
      <div class={s.GameItem} onClick={goToUrl(game.$path)}>
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

GameItem.defaultProps = {
  game: {},
}

export default GameItem
