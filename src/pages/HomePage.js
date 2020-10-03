import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { css } from 'linaria'

import { Flex } from '../components/Flex'
import { Menu } from '../components/Menu'
import { GameItem } from '../components/GameItem'
import { DataStore } from '../lib/datastore'
import { sortByKey } from '../lib/utils'

const HomePageCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: var(--g-padding-vertical) auto;
  padding: var(--g-padding-page-top) calc((100vw - 800px) / 2) 32px;
  position: absolute;
  width: 100vw;
  z-index: 1;
`

function createGame(games, setGames) {
  const count = document.getElementsByClassName('game').length
  const game = { name: `Game ${count}` }
  DataStore.Games.add(game)
  setGames([...games, game])
}

/** List games for the main page */
export function HomePage() {
  const [games, setGames] = useState([])

  const addGame = () => createGame(games, setGames)

  useEffect(() => {
    DataStore.Games().then(setGames)
  }, [])

  return (
    <>
      <Menu titleOnly />

      <div class={HomePageCss}>
        <Flex justify="space-between">
          <h2>Games</h2>
          <button onClick={addGame}>Add</button>
        </Flex>

        {/* Games List */}
        {games.sort(sortByKey('name')).map(game => (
          <GameItem game={game} />
        ))}
      </div>
    </>
  )
}
