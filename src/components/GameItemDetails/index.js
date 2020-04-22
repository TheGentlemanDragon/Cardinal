import { h } from 'preact'

import s from './style.css'

function GameItemDetails({ game }) {
  return <div class={s.GameItemDetails}>Game Item Details {game.name}</div>
}

GameItemDetails.defaultProps = {
  game: {},
}

export default GameItemDetails
