import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { css } from 'linaria'

import { GameItem } from '../components/GameItem'
import { DataStore } from '../lib/datastore'

const mainCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: var(--g-padding-vertical) auto;
  padding: var(--g-padding-page-top) calc((100vw - 800px) / 2) 32px;
  position: absolute;
  width: 100vw;
  z-index: 1;
`

/** List games for the main page */
export function HomePage() {
  const [games, setGames] = useState([])

  useEffect(() => {
    DataStore.Games().then(setGames)
  }, [])

  return (
    <div class={mainCss}>
      <h2>Games</h2>

      {/* Games List */}
      {games.map(game => (
        <GameItem game={game} />
      ))}
    </div>
  )
}
