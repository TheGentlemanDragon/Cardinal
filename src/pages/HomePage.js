import { h } from 'preact'
import { css } from 'linaria'

import { Flex } from '../components/Flex'
import { GameItem } from '../components/GameItem'
import { Title } from '../components/Title'
import { useDS } from '../hooks/useDS'
import { sortByKey } from '../lib/utils'
import { useEffect } from 'preact/hooks'

const HomePageCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0 20px;
  width: 640px;
`

/** List games for the main page */
export function HomePage() {
  const Games = useDS('Games')

  const addGame = () => {
    const count = document.getElementsByClassName('game').length
    Games.add({ name: `Game ${count}` })
  }

  useEffect(() => {
    Games.getList()
  }, [])

  return (
    <div class={HomePageCss}>
      <Title />

      <Flex justify="space-between">
        <h2>Games</h2>
        <button onClick={addGame}>Add</button>
      </Flex>

      {/* Games List */}
      {Games.list.sort(sortByKey('name')).map(game => (
        <GameItem game={game} />
      ))}
    </div>
  )
}
