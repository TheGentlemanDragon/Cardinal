import { h } from 'preact'
import { useState } from 'preact/hooks'

import GameItem from 'components/GameItem'
import s from './style.css'

/** List games for the main page
 *  @arg {Object[]} games array of items to list
 */
function GameList({ games }) {
  const [openIndex, setOpenIndex] = useState(-1)

  const openDetails = index => () =>
    setOpenIndex(index === openIndex ? -1 : index)

  return (
    <div class={s.GameList}>
      {/* Games List */}
      {games.map((game, index) => (
        <GameItem
          game={game}
          isOpen={index === openIndex}
          toggle={openDetails(index)}
        />
      ))}
    </div>
  )
}

export default GameList
