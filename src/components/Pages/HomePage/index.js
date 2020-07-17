import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
// import PropTypes from 'proptypes'

import { GameItem } from 'components'
import { Firebase } from 'lib/data'
import s from './style.css'

/** List games for the main page */
function HomePage() {
  const [games, setGames] = useState([])

  useEffect(() => {
    ;(async () => {
      setGames(await Firebase.list('games', 'name'))
    })()
  }, [])

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
