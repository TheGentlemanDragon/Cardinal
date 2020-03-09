import { h } from 'preact'
import ItemList from '../../components/ItemList'
import GameItem from '../../components/GameItem'
// import style from './style.css'

function Home() {
  return (
    <>
      <ItemList
        title="Games"
        items={['game1', 'game2', 'game3', 'game4', 'game5', 'game6']}
        ItemComponent={GameItem}
      />
    </>
  )
}

export default Home
