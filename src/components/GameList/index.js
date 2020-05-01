import { h } from 'preact'
// import PropTypes from 'proptypes'

import GameItem from 'components/GameItem'
import useGames from 'hooks/useGames'
import s from './style.css'

/** List games for the main page */
function GameList() {
  const games = useGames()

  return (
    <div class={s.GameList}>
      <h2>Games</h2>

      {/* Games List */}
      {games.map(game => (
        <GameItem game={game} />
      ))}
    </div>
  )
}

// GameList.propTypes = {}

export default GameList
