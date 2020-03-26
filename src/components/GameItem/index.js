import { h } from 'preact'
import { useCallback } from 'preact/hooks'
import s from './style.css'

function GameItem({ item }) {
  const click = useCallback(() => null, [])

  return (
    <li class={s.gameItem} onClick={click}>
      <figure>Preview</figure>
      <dl>
        <dt>{item.name}</dt>
        <dd>{item.description}</dd>
      </dl>
      <menu>
        <menuitem></menuitem>
      </menu>
    </li>
  )
}

export default GameItem
