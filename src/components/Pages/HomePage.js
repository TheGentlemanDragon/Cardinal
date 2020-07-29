import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { css } from 'linaria'

import { GameItem } from 'components'
import { Firebase } from 'lib/data'

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
    ;(async () => {
      setGames(await Firebase.list('games', 'name'))
    })()
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
