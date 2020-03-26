import { h } from 'preact'
import useGames from 'hooks/useGames'

import GameList from 'components/GameList'

function Home() {
  const games = useGames()

  return (
    <>
      <GameList title="Games" items={games} />
    </>
  )
}

export default Home
