import { h } from 'preact'

import GameItem from 'components/GameItem'
import s from './style.css'

/** List games for the main page
 *  @arg {Object[]} items               array of items to list
 */
function GameList({ items }) {
  return (
    <section class={s.gameList}>
      {/* Games List */}
      <ul class={s.list}>
        {items.map(item => (
          <GameItem item={item} />
        ))}
      </ul>
    </section>
  )
}

export default GameList
