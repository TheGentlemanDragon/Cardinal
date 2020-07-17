import { h } from 'preact'
// import PropTypes from 'proptypes'

import { GameItem } from 'components'
import { useGames } from 'hooks'
import s from './style.css'

/** List games for the main page */
function HomePage() {
  const games = useGames()

  return (
    <div class={s.HomePage}>
      <h2>Games</h2>

      {/* Games List */}
      {games.map(game => (
        <GameItem game={game} />
      ))}
    </div>
  )
}

// HomePage.propTypes = {}

export default HomePage
