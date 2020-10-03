import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { css } from 'linaria'

import { Flex } from '../components/Flex'
import { GameItem } from '../components/GameItem'
import { Title } from '../components/Title'
import { DataStore } from '../lib/datastore'
import { sortByKey } from '../lib/utils'

const HomePageCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0 20px;
  width: 640px;
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
    <div class={HomePageCss}>
      <Title />

      <Flex justify="space-between">
        <h2>Games</h2>
        <button onClick={addGame}>Add</button>
      </Flex>

      {/* Games List */}
      {games.sort(sortByKey('name')).map(game => (
        <GameItem game={game} />
      ))}
    </div>
  )
}
