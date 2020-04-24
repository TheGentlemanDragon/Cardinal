import { h } from 'preact'

import GameList from 'components/GameList'
import useGames from 'hooks/useGames'

function Home() {
  const games = useGames()

  return (
    <>
      <GameList title="Games" games={games} />
    </>
  )
}

export default Home
