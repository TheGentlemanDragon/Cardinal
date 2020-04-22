import { h } from 'preact'

import { GameItemDetails } from 'components'
import { noop } from 'lib/functional'
import s from './style.css'

function GameItem({ game, isOpen, toggle }) {
  return (
    <>
      <div class={s.GameItem} onClick={toggle}>
        <figure>Preview</figure>
        <dl>
          <dt>{game.name}</dt>
          <dd>{game.description}</dd>
        </dl>
        <menu>
          <menuitem />
        </menu>
      </div>

      {isOpen && <GameItemDetails game={game} />}
    </>
  )
}

GameItem.defaultProps = {
  game: {},
  isOpen: false,
  toggle: noop,
}

export default GameItem
